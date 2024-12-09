<?php

namespace App\Services;

use App\Exports\Trainset\TrainsetsExport;
use App\Exports\Trainset\TrainsetsTemplateExport;
use App\Helpers\NumberHelper;
use App\Models\CarriagePanel;
use App\Models\PanelAttachment;
use App\Models\Trainset;
use App\Services\TrainsetAttachmentComponent\TrainsetAttachmentComponentGenerator;
use App\Support\Enums\PanelAttachmentHandlerHandlesEnum;
use Symfony\Component\HttpFoundation\BinaryFileResponse;
use App\Support\Enums\TrainsetAttachmentHandlerHandlesEnum;
use App\Support\Interfaces\Services\CarriageServiceInterface;
use App\Support\Interfaces\Services\TrainsetServiceInterface;
use App\Support\Interfaces\Services\SerialPanelServiceInterface;
use App\Support\Interfaces\Services\CarriagePanelServiceInterface;
use App\Support\Interfaces\Services\PresetTrainsetServiceInterface;
use App\Support\Interfaces\Repositories\TrainsetRepositoryInterface;
use File;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Imagick;
use ImagickException;
use Intervention\Image\Geometry\Factories\LineFactory;
use Intervention\Image\ImageManager;
use Intervention\Image\Interfaces\ImageInterface;
use Maatwebsite\Excel\Facades\Excel;
use SimpleSoftwareIO\QrCode\Facades\QrCode;
use ZipArchive;
use Carbon\Carbon;
use App\Imports\Trainset\TrainsetsImport;
use App\Support\Enums\TrainsetStatusEnum;
use App\Support\Enums\SerialPanelManufactureStatusEnum;

class TrainsetService extends BaseCrudService implements TrainsetServiceInterface {
    public function updatePreset(Trainset $trainset, array $data): bool {
        return DB::transaction(function () use ($trainset, $data) {
            Model::withoutEvents(function () use ($trainset, $data) {
                // Step 1: Delete nested data related to the carriages
                $preset_trainset_id = $data['preset_trainset_id'];
                $presetTrainset = $this->presetTrainsetService()->findOrFail($preset_trainset_id);

                $trainset->carriage_trainsets()->each(function ($carriageTrainset) {
                    $this->carriageTrainsetService()->delete($carriageTrainset);
                });

                // Step 2: Detach existing carriages from the trainset
                $trainset->carriages()->detach();

                // Step 3: Aggregate quantities for duplicate carriage IDs
                $carriages = [];
                foreach ($presetTrainset->carriage_presets as $carriagePreset) {
                    $carriageId = $carriagePreset['carriage_id'];
                    $qty = $carriagePreset['qty'];

                    if (isset($carriages[$carriageId])) {
                        $carriages[$carriageId]['qty'] += $qty;
                    } else {
                        $carriages[$carriageId] = ['qty' => $qty];
                    }
                }

                // Step 4: Sync the aggregated carriages with the trainset
                $trainset->carriages()->sync($carriages);

                $this->update($trainset, ['preset_trainset_id' => $preset_trainset_id]);
            });

            return true;
        });
    }

    public function savePreset(Trainset $trainset, array $data): bool {
        return DB::transaction(function () use ($trainset, $data) {
            $presetName = $data['preset_name'];
            $projectId = $data['project_id'];

            // Step 1: Retrieve the trainset carriages
            $carriages = $trainset->carriages;

            // Step 2: Create a new preset trainset
            $presetTrainset = $this->presetTrainsetService()->create([
                'name' => $presetName,
                'project_id' => $projectId,
            ]);

            // Step 3: Aggregate quantities for duplicate carriage IDs
            $carriagePresets = [];
            foreach ($carriages as $carriage) {
                $carriageId = $carriage['id'];
                $qty = $carriage['pivot']['qty'];

                if (isset($carriagePresets[$carriageId])) {
                    $carriagePresets[$carriageId]['qty'] += $qty;
                } else {
                    $carriagePresets[$carriageId] = ['carriage_id' => $carriageId, 'qty' => $qty];
                }
            }

            // Step 4: Sync the aggregated carriages with the preset trainset
            $presetTrainset->carriage_presets()->createMany(array_values($carriagePresets));

            // Step 5: Update the trainset's preset_trainset_id
            $trainset->update(['preset_trainset_id' => $presetTrainset->id]);

            // avoid event listener

            return true;
        });
    }

    public function deleteCarriageTrainset(Trainset $trainset, $data): bool {
        return DB::transaction(function () use ($trainset, $data) {
            $carriageTrainsetId = $data['carriage_trainset_id'];

            // Step 1: Find the carriage in the pivot table
            $carriage = $trainset->carriages()->wherePivot('id', $carriageTrainsetId)->firstOrFail();

            // Step 2: Detach the carriage from the pivot table
            $trainset->carriages()->detach($carriage);

            // Step 3: Optionally update the trainset's preset_trainset_id to null
            //            $trainset->update(['preset_trainset_id' => null]);

            return true;
        });
    }

    public function addCarriageTrainset(Trainset $trainset, array $data): bool {
        return DB::transaction(function () use ($trainset, $data) {
            $carriageId = $data['carriage_id'];
            $carriageType = $data['carriage_type'];
            $carriageDescription = $data['carriage_description'];
            $carriageQty = $data['carriage_qty'];

            if ($carriageId) {
                // Step 1: Find the carriage by ID
                $carriage = $this->carriageService()->findOrFail($carriageId);
            } else {
                // Step 1: Create a new carriage
                $carriage = $this->carriageService()->create([
                    'type' => $carriageType,
                    'description' => $carriageDescription,
                ]);
            }

            // Step 2: Attach or update the carriage with the specified quantity
            $existingCarriage = $trainset->carriages()->where('carriage_id', $carriage->id)->first();
            if ($existingCarriage) {
                $trainset->carriages()->updateExistingPivot($carriage->id, [
                    'qty' => $existingCarriage->pivot->qty + $carriageQty,
                ]);
            } else {
                $trainset->carriages()->attach($carriage, ['qty' => $carriageQty]);
            }

            // Step 3: Optionally update the trainset's preset_trainset_id to null
            //            $trainset->update(['preset_trainset_id' => null]);

            return true;
        });
    }

    public function updateCarriageTrainset(Trainset $trainset, array $data): bool {
        return DB::transaction(function () use ($trainset, $data) {
            $carriageTrainsetId = $data['carriage_trainset_id'];
            $carriage = $trainset->carriages()->wherePivot('id', $carriageTrainsetId)->firstOrFail();

            $updateData = [];
            if (isset($data['qty'])) {
                $updateData['qty'] = $data['qty'];
            }
            if (isset($data['carriage_id'])) {
                $updateData['carriage_id'] = $data['carriage_id'];
            }

            $trainset->carriages()->updateExistingPivot($carriage->id, $updateData);

            //            $trainset->update(['preset_trainset_id' => null]);

            return true;
        });
    }

    public function importData(UploadedFile $file): bool {
        Excel::import(new TrainsetsImport, $file);

        return true;
    }

    public function exportData(): BinaryFileResponse {
        return Excel::download(new TrainsetsExport, 'trainsets.xlsx');
    }

    public function getImportDataTemplate(): BinaryFileResponse {
        return (new TrainsetsTemplateExport)->download('trainsets_template.xlsx');
    }

    public function generateAttachments(Trainset $trainset, array $data): bool {
        /**
         * Draft 1:
         *
         * get all trainsets of the project
         * get all carriages of the trainsets (carriage_trainsets)
         *
         * -- Panel Attachment
         *
         * get all carriage panels of the carriages (carriage_panels) [!count panel qty]
         *      get all serial panels
         *
         * -- Trainset Attachment
         *
         *      get panel components (carriage_panel_component)
         *          get panel component material (component_material) [qty]
         *              get component
         *                 get component progress (progress)
         *                      get progress_step
         *                      get work_aspect
         *              get component material (raw_material)
         *      get panel progress (progress)
         *          get progress_step
         *          get work_aspect
         *      get panel material (panel_material) [qty]
         *        get material (raw_material)
         *
         * Draft 2:
         *
         * get panel component (carriage_panel_component)
         *  get component (component) [qty]
         *     get component material (component_material) [qty]
         *      get material (raw_material)
         * get all components of the project (component)
         */
        DB::transaction(function () use ($trainset, $data) {
            logger('Trainset ' . $trainset);
            if ($trainset->status === TrainsetStatusEnum::PROGRESS) {
                return false;
            }
            $this->generateTrainsetAttachment($trainset, $data);
            $this->generatePanelAttachment($trainset, $data);

            // $this->repository->update($trainset, ['status' => TrainsetStatusEnum::PROGRESS]);
            $this->checkGeneratedAttachment($trainset);
            // DB::rollBack();
        });

        return true;
    }

    public function generateTrainsetAttachment(Trainset $trainset, array $data): bool|array {
        return DB::transaction(function () use ($trainset, $data) {
            $division = $data['division'];
            $sourceWorkstationId = $data["{$division}_source_workstation_id"];
            $destinationWorkstationId = $data["{$division}_destination_workstation_id"];

            // $trainset->carriage_trainsets()->each(function ($carriageTrainset) use ($sourceWorkstationId, $destinationWorkstationId) {
            $trainsetAttachment = $this->trainsetAttachmentService()->create([
                'trainset_id' => $trainset->id,
                'source_workstation_id' => $sourceWorkstationId,
                'destination_workstation_id' => $destinationWorkstationId,
                'type' => $division,
            ]);

            // CREATE TRAINSET ATTACHMENT HANDLER
            $this->trainsetAttachmentHandlerService()->create([
                'user_id' => auth()->user()->id,
                'handler_name' => auth()->user()->name,
                'trainset_attachment_id' => $trainsetAttachment->id,
                'handles' => TrainsetAttachmentHandlerHandlesEnum::PREPARE->value,
            ]);

            $trainsetAttachment->update(['attachment_number' => $this->generateAttachmentNumber($trainsetAttachment)]);
            $generateResult = app(TrainsetAttachmentComponentGenerator::class)->generate($trainsetAttachment);

            if ($generateResult['success'] === false) {
                logger('Failed to generate trainset attachment');
                DB::rollBack();

                return $generateResult;
            }

            //            $serialPanelIds = $this->generateSerialPanels($trainsetAttachment, $carriageTrainset);

            //            $serialPanelIdsString = implode(',', $serialPanelIds);
            $qrCode = "KPM:{$trainsetAttachment->attachment_number};P:{$trainset->project->name};TS:{$trainset->name};;";
            $path = "trainset_attachments/qr_images/{$trainsetAttachment->id}.svg";
            $this->generateQrCode($qrCode, $path);

            $trainsetAttachment->update(['qr_code' => $qrCode, 'qr_path' => $path]);
            // });
            $this->checkGeneratedAttachment($trainset);
            // $this->repository->update($trainset, ['status' => TrainsetStatusEnum::PROGRESS]);

            return true;
        });
    }

    public function generatePanelAttachment(Trainset $trainset, array $data): bool|array {
        return DB::transaction(function () use ($trainset, $data) {
            foreach ($trainset->carriage_trainsets as $carriageTrainset) {
                foreach ($carriageTrainset->carriage_panels as $carriagePanel) {
                    if (!$carriagePanel->progress) {
                        logger('Failed to generate panel attachment');
                        DB::rollBack();

                        return [
                            'status' => false,
                            'code' => 409,
                            'message' => __('exception.services.trainset_service.update.generate_panel_attachments.panel_progress_not_identified_exception', ['panel' => $carriagePanel->panel->name]),
                        ];
                    }
                    $sourceWorkstationId = $data['assembly_source_workstation_id'];
                    $destinationWorkstationId = $data['assembly_destination_workstation_id'];

                    $panelAttachment = $this->panelAttachmentService()->create([
                        'carriage_panel_id' => $carriagePanel->id,
                        'source_workstation_id' => $sourceWorkstationId,
                        'destination_workstation_id' => $destinationWorkstationId,
                    ]);

                    // CREATE PANEL ATTACHMENT HANDLER
                    $this->panelAttachmentHandlerService()->create([
                        'user_id' => auth()->user()->id,
                        'handler_name' => auth()->user()->name,
                        'panel_attachment_id' => $panelAttachment->id,
                        'handles' => PanelAttachmentHandlerHandlesEnum::PREPARE->value,
                    ]);

                    $panelAttachment->update(['attachment_number' => $this->generateAttachmentNumber($panelAttachment)]);

                    $serialPanelIds = $this->generateSerialPanels($panelAttachment, $carriagePanel);

                    $serialPanelIdsString = implode(',', $serialPanelIds);
                    $qrCode = "KPM:{$panelAttachment->attachment_number};SN:[{$serialPanelIdsString}];P:{$carriagePanel->carriage_trainset->trainset->project->name};TS:{$carriagePanel->carriage_trainset->trainset->name};;";
                    $path = "panel_attachments/qr_images/{$panelAttachment->id}.svg";
                    $this->generateQrCode($qrCode, $path);

                    $panelAttachment->update(['qr_code' => $qrCode, 'qr_path' => $path]);

                    logger('Panel Attachment: ' . $panelAttachment);
                    $this->checkGeneratedAttachment($trainset);
                }
            }

            return true;
        });
    }

    private function generateQrCode(string $content, string $path) {
        logger($path);
        $qrCodeContent = QrCode::format('svg')->size(600)->generate($content);
        Storage::put("public/{$path}", $qrCodeContent);
    }

    private function generateSerialPanels(PanelAttachment $panelAttachment, CarriagePanel $carriagePanel) {
        $serialPanelIds = [];
        logger($carriagePanel->carriage_trainset->qty);
        logger($carriagePanel->qty);
        $qty = $carriagePanel->carriage_trainset->qty * $carriagePanel->qty;
        logger('Qty: ' . $qty);
        for ($i = 0; $i < $qty; $i++) {
            $serialPanel = $this->serialPanelService()->create([
                'panel_attachment_id' => $panelAttachment->id,
                'manufacture_status' => SerialPanelManufactureStatusEnum::IN_PROGRESS,
            ]);

            $serialPanelIds[] = $serialPanel->id;

            $qrCode = "KPM:{$panelAttachment->attachment_number};SN:{$serialPanel->id};P{$carriagePanel->carriage_trainset->trainset->project->name};TS:{$carriagePanel->carriage_trainset->trainset->name};;";
            $path = "serial_panels/qr_images/{$serialPanel->id}.svg";
            $this->generateQrCode($qrCode, $path);

            $this->serialPanelService()->update($serialPanel, [
                'product_no' => $panelAttachment->trainset->project->id .
                    $panelAttachment->trainset->id .
                    $panelAttachment->carriage_panel->carriage->id .
                    $panelAttachment->carriage_panel->panel_id .
                    $serialPanel->id,
                'qr_code' => $qrCode,
                'qr_path' => $path,
            ]);

            //            logger('Current serialPanelIds array: ' . json_encode($serialPanelIds));
        }

        //        logger('Final serialPanelIds array: ' . json_encode($serialPanelIds));

        return $serialPanelIds;

        //        $carriagePanel->panel_components()->each(function ($panelComponent) use ($carriagePanel, $panelAttachment) {
        //            $qty = $panelComponent->qty;

        //            $component = $panelComponent->component;
        //            $componentMaterials = $component->component_materials;
        //
        //            $componentMaterials->each(function ($componentMaterial) {
        //                $material = $componentMaterial->material;
        //                $qty = $componentMaterial->qty;
        //
        //                $serialPanels = $material->serial_panels;
        //
        //                $serialPanels->each(function ($serialPanel) use ($qty) {
        //                    $serialPanel->update(['qty' => $serialPanel->qty + $qty]);
        //                });
        //            });
        //        });
    }

    public function generateAttachmentNumber(Model $model) {

        if ($model instanceof PanelAttachment) {
            $carriagePanelIds = $this->carriagePanelService()->find([
                'carriage_trainset_id' => $model->carriage_panel->carriage_trainset_id,
            ])->pluck('id')->toArray();

            $numberAttachmentOnTrainset = $this->panelAttachmentService()->find([
                ['carriage_panel_id', 'in', $carriagePanelIds],
            ]);

            logger('id' . $model->carriage_panel->carriage_trainset_id);

            logger('Number of attachments on trainset: ' . $numberAttachmentOnTrainset);
            $romanNumberAttachmentOnTrainset = NumberHelper::intToRoman($numberAttachmentOnTrainset->count());
            $currentYear = date('Y');
            $attachmentNumber = "{$model->id}/PPC/KPM/{$romanNumberAttachmentOnTrainset}/{$currentYear}";

            return $attachmentNumber;
        }

        $numberAttachmentOnTrainset = $this->trainsetAttachmentService()->find([
            'trainset_id' => $model->trainset_id,
        ])->count();

        logger('Number of attachments on trainset: ' . $numberAttachmentOnTrainset);
        $romanNumberAttachmentOnTrainset = NumberHelper::intToRoman($numberAttachmentOnTrainset);
        $currentYear = date('Y');
        $attachmentNumber = "{$model->id}/PPC/KPM/{$romanNumberAttachmentOnTrainset}/{$currentYear}";

        return $attachmentNumber;

    }

    public function checkGeneratedAttachment(Trainset $trainset): void {
        $totalRequiredAttachment = 2; // base total required trainset attachment in 1 trainset
        $totalGeneratedAttachment = 0;
        $carriageTrainsetsIds = $trainset->carriage_trainsets()->pluck('id')->toArray();
        $carriagePanelsIds = $this->carriagePanelService()->find([
            'carriage_trainset_id', 'in', $carriageTrainsetsIds,
        ])->pluck('id')->toArray();

        $totalRequiredAttachment += count($carriagePanelsIds);

        $trainsetAttachments = $this->trainsetAttachmentService()->find([
            'trainset_id' => $trainset->id,
        ]);
        $totalGeneratedAttachment = $trainsetAttachments->count(); // should be 2

        $panelAttachments = $this->panelAttachmentService()->find([
            ['carriage_panel_id', 'in', $carriagePanelsIds],
        ]);
        $totalGeneratedAttachment += $panelAttachments->count();

        if ($totalGeneratedAttachment > 0) {
            $this->repository->update($trainset, ['status' => TrainsetStatusEnum::PROGRESS]);
        }
    }

    /**
     * @throws ImagickException
     */
    public function exportSerialNumbers(Trainset $trainset): BinaryFileResponse {
        $manager = ImageManager::imagick();
        $pngFiles = [];
        $tempDirectory = storage_path('app/temp/sn-exports');

        /**
         * 1. Clean up any existing temporary files at the start
         * 2. Get all qrs from trainset_attachments and panel_attachments
         * 3. load those qrs paths:
         *      - trainset_attachment = storage/app/public/trainset_attachments/qr_images/{id}.svg
         *      - panel_attachment = storage/app/public/panel_attachments/qr_images/{id}.svg
         * 4. place those svg qrs into template in public/assets/png-templates/sn-template.png
         * 5. export final state of those qrs into storage/app/temp/sn-exports
         * 6. zip all final state of those qrs
         * 7. download the zip
         * 8. delete all temp files
         */

        // Step 1: Clean up any existing temporary files at the start
        if (File::exists($tempDirectory)) {
            File::cleanDirectory($tempDirectory);
        } else {
            File::makeDirectory($tempDirectory, 0755, true); // Create if it doesn't exist
        }

        $qrs = $trainset->serial_panels->map(function ($serialPanel) {
            return [
                'qr_path' => $serialPanel->qr_path,
                'product_no' => $serialPanel->product_no,
                'serial_no' => $serialPanel->id,
                'product_name' => $serialPanel->panel_attachment->carriage_panel->panel->name,
            ];
        });

        // Crucial: check if temp and sn-exports directory exist
        if (!File::exists(storage_path('app/temp/sn-exports'))) {
            File::makeDirectory(storage_path('app/temp/sn-exports'), 0755, true);
        }

        // Step 2: Convert SVGs to PNG and overlay on template
        $qrs->each(function ($qr, $index) use ($manager, &$pngFiles) {
            $qrPath = $qr['qr_path'];
            $firstTemplateStartOffset = 20;
            $secondTemplateStartOffset = 970;

            $productNo = $qr['product_no'];
            $serialNo = $qr['serial_no'];
            $productName = $qr['product_name'];
            $svgPath = storage_path("app/public/$qrPath");

            // Convert SVG to PNG using Imagick
            $image = new Imagick;
            $image->readImage($svgPath);
            $image->setImageFormat('png');

            $pngQrPath = storage_path("app/temp/qr_temp_{$index}.png");
            $image->writeImage($pngQrPath);
            $image->clear();

            // Load the template
            $template = $manager->read(public_path('assets/png-templates/sn-template.png'));

            // Overlay the QR code
            $qrImage = $manager->read($pngQrPath)->resize(600, 600); // Resize as needed

            $logo = $manager->read(public_path('assets/png-templates/company-logo.png'))->resize(150, 100); // Adjust size as needed

            // Insert the logo at the center of the QR code
            $qrImage->place($logo, 'center');

            // place 1st qr code on the left side
            $template->place($qrImage, 'top-left', $firstTemplateStartOffset, 15);
            // place 2nd qr code on the right side
            $template->place($qrImage, 'top-left', $secondTemplateStartOffset, 15);

            // Add text left side
            $this->serialNumberTextMapper($template, $productName, $firstTemplateStartOffset, $serialNo, $productNo);

            // Add 2nd text right side
            $this->serialNumberTextMapper($template, $productName, $secondTemplateStartOffset, $serialNo, $productNo);

            // 4. Save the final image and keep track of paths
            $outputPath = storage_path("app/temp/sn-exports/$productNo.png");
            $template->save($outputPath);
            $pngFiles[] = $outputPath;
        });

        // Step 5: Create a ZIP file with all the final PNGs
        $zipPath = storage_path('app/temp/sn-exports.zip');
        $zip = new ZipArchive;
        if ($zip->open($zipPath, ZipArchive::CREATE | ZipArchive::OVERWRITE) === true) {
            foreach ($pngFiles as $file) {
                $zip->addFile($file, basename($file));
            }
            $zip->close();
        }

        // Step 6: Provide download response for the ZIP file
        return response()->download($zipPath)->deleteFileAfterSend(true);
    }

    private function serialNumberTextMapper(ImageInterface $template, $productName, int $templateStartingOffsetX, $serialNo, $productNo): void {
        $defaultFontSize = 46;
        $defaultLineHeight = 1.7;
        $textStartingOffset = 640;
        $serialNoStartingOffsetY = 970;

        // Limit the product name to 6 lines
        $maxLines = 6;
        $wrappedProductName = wordwrap($productName, 37, "\n");
        $productNameLines = explode("\n", $wrappedProductName);
        $productNameLines = array_slice($productNameLines, 0, $maxLines);
        $productName = implode("\n", $productNameLines);

        $template->text("Panel: $productName", $templateStartingOffsetX, $textStartingOffset, function ($font) use ($defaultFontSize, $defaultLineHeight) {
            $font->file(public_path('assets/fonts/arial.ttf'));
            $font->size($defaultFontSize);
            $font->valign('top');
            $font->lineHeight($defaultLineHeight);
            $font->color('#000000');
        });

        // Draw the horizontal line
        $template->drawLine(function (LineFactory $line) use ($templateStartingOffsetX, $serialNoStartingOffsetY) {
            $offset = 50;
            $fromX = $templateStartingOffsetX;
            $fromY = $serialNoStartingOffsetY + $offset;
            $toX = $templateStartingOffsetX + 800;
            $toY = $serialNoStartingOffsetY + $offset;

            // starting point of line
            $line->from($fromX, $fromY);
            // ending point
            $line->to($toX, $toY);
            $line->color('#000000'); // line color in hex format
            $line->width(5); // line width in pixels
        });

        $template->text("Serial No: $serialNo", $templateStartingOffsetX, $serialNoStartingOffsetY + 100, function ($font) use ($defaultFontSize, $defaultLineHeight) {
            $font->file(public_path('assets/fonts/arial.ttf'));
            $font->size($defaultFontSize);
            $font->valign('top');
            $font->lineHeight($defaultLineHeight);
            $font->color('#000000');
        });

        $template->text("Product No: $productNo", $templateStartingOffsetX, $serialNoStartingOffsetY + 170, function ($font) use ($defaultFontSize, $defaultLineHeight) {
            $font->file(public_path('assets/fonts/arial.ttf'));
            $font->size($defaultFontSize);
            $font->valign('top');
            $font->lineHeight($defaultLineHeight);
            $font->color('#000000');
        });
    }

    public function delete($keyOrModel): bool {
        if (!$keyOrModel->canBeDeleted()) {
            abort(402, __('exception.services.trainset_service.delete.trainset_in_progress_exception'));
        }

        $keyOrModel->carriage_trainsets()->each(function ($carriageTrainset) {
            $this->carriageTrainsetService()->delete($carriageTrainset);
        });

        return parent::delete($keyOrModel);
    }

    public function calculateEstimatedTime($trainset_id = null) {
        $mechanicTime = 0;
        $electricalTime = 0;
        $assemblyTime = 0;

        if ($trainset_id) {
            $trainset = \App\Models\Trainset::with(['carriage_trainsets' => [
                'carriage_panels' => [
                    'progress.steps'
                ]
            ]])->findOrFail($trainset_id);

            foreach ($trainset->carriage_trainsets as $carriageTrainset) {
                foreach ($carriageTrainset->carriage_panels as $carriagePanel) {
                    $stepTime = 0;
                    foreach ($carriagePanel->progress->steps as $step) {
                        $stepTime = $step->estimated_time * $carriagePanel->qty * $carriageTrainset->qty;
                    }

                    switch($carriagePanel->progress->work_aspect_id) {
                        case 1: // Mechanic
                            $mechanicTime += $stepTime;
                            break;
                        case 2: // Electric
                            $electricalTime += $stepTime;
                            break;
                        case 3: // Assembly
                            $assemblyTime += $stepTime;
                            break;
                    }

                    foreach($carriagePanel->carriage_panel_components as $component) {
                        $componentStepTime = 0;
                        foreach ($component->progress->steps as $step) {
                            $componentStepTime = $step->estimated_time * $component->qty * $carriagePanel->qty * $carriageTrainset->qty;
                        }

                        switch($component->progress->work_aspect_id) {
                            case 1: // Mechanic
                                $mechanicTime += $componentStepTime;
                                break;
                            case 2: // Electric
                                $electricalTime += $componentStepTime;
                                break;
                            case 3: // Assembly
                                $assemblyTime += $componentStepTime;
                                break;
                        }
                    }
                }
            }

            $totalTime = max($mechanicTime, $electricalTime) + $assemblyTime;

            $minutesPerWorkingDay = 8 * 60; // 8 hours * 60 minutes
            $calculatedEstimateTime = ceil($totalTime / $minutesPerWorkingDay);

            $startDate = $this->getInitialDate($trainset);;
            $endDate = Carbon::parse($startDate);

            // Add working days considering only Monday-Friday
            for ($i = 0; $i < $calculatedEstimateTime; $i++) {
                $endDate->addDay();
                // Skip weekends
                while ($endDate->isWeekend()) {
                    $endDate->addDay();
                }
            }
            $trainset->update([
                'mechanical_time' => $mechanicTime,
                'electrical_time' => $electricalTime,
                'assembly_time' => $assemblyTime,
                'calculated_estimate_time' => $calculatedEstimateTime,
                'initial_date' => $startDate,
                'estimated_end_date' => $endDate->format('Y-m-d')
            ]);

            $trainsets = $trainset->project->trainsets()->orderBy('id')->get();
            $currentTrainsetIndex = $trainsets->search(fn($t) => $t->id === $trainset->id);
            if ($currentTrainsetIndex !== false && $currentTrainsetIndex < count($trainsets) - 1) {
                return $this->getInitialDate($trainsets[$currentTrainsetIndex + 1]);
            }

            return $endDate->format('Y-m-d');
            // return response()->json([
            //     'trainset_id' => $trainset_id,
            //     'mechanical_time' => $mechanicTime,
            //     'electrical_time' => $electricalTime,
            //     'assembly_time' => $assemblyTime,
            //     'total_estimated_time' => $totalTime,
            //     'calculated_estimate_time' => $calculatedEstimateTime,
            //     'initial_date' => $startDate,
            //     'estimated_end_date' => $endDate->format('Y-m-d')
            // ]);
        }
    }

    public function getInitialDate(Trainset $trainset) {
        $trainsets = $trainset->project->trainsets()->orderBy('id')->get();
        $currentTrainsetIndex = $trainsets->search(fn($t) => $t->id === $trainset->id);

        if ($currentTrainsetIndex === 0) {
            return $trainset->project->initial_date;
        } else {
            $previousTrainset = $trainsets[$currentTrainsetIndex - 1];
            if ($previousTrainset->mechanical_time && $previousTrainset->electrical_time && $previousTrainset->initial_date) {
                $totalTime = max($previousTrainset->mechanical_time, $previousTrainset->electrical_time);
                $minutesPerWorkingDay = 8 * 60; // 8 hours * 60 minutes
                $calculatedEstimateTime = ceil($totalTime / $minutesPerWorkingDay);

                $startDate = $previousTrainset->initial_date;
                $endDate = Carbon::parse($startDate);

                for ($i = 0; $i < $calculatedEstimateTime; $i++) {
                    $endDate->addDay();
                    // Skip weekends
                    while ($endDate->isWeekend()) {
                        $endDate->addDay();
                    }
                }
                return $endDate->format('Y-m-d');
            } else {
                return $this->calculateEstimatedTime($previousTrainset->id);
            }
        }
    }

    public function getEndDate(Trainset $trainset) {

    }

    protected function getRepositoryClass(): string {
        return TrainsetRepositoryInterface::class;
    }
}
