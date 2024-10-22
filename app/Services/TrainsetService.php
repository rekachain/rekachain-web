<?php

namespace App\Services;

use Adobrovolsky97\LaravelRepositoryServicePattern\Services\BaseCrudService;
use App\Exports\Trainset\TrainsetsExport;
use App\Exports\Trainset\TrainsetsTemplateExport;
use App\Helpers\NumberHelper;
use App\Imports\Trainset\TrainsetsImport;
use App\Models\CarriagePanel;
use App\Models\PanelAttachment;
use App\Models\Trainset;
use App\Services\TrainsetAttachmentComponent\TrainsetAttachmentComponentGenerator;
use App\Support\Enums\SerialPanelManufactureStatusEnum;
use App\Support\Enums\TrainsetAttachmentTypeEnum;
use App\Support\Enums\TrainsetStatusEnum;
use App\Support\Interfaces\Repositories\TrainsetRepositoryInterface;
use App\Support\Interfaces\Services\CarriagePanelServiceInterface;
use App\Support\Interfaces\Services\CarriageServiceInterface;
use App\Support\Interfaces\Services\CarriageTrainsetServiceInterface;
use App\Support\Interfaces\Services\PanelAttachmentServiceInterface;
use App\Support\Interfaces\Services\PresetTrainsetServiceInterface;
use App\Support\Interfaces\Services\SerialPanelServiceInterface;
use App\Support\Interfaces\Services\TrainsetAttachmentServiceInterface;
use App\Support\Interfaces\Services\TrainsetServiceInterface;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Maatwebsite\Excel\Facades\Excel;
use SimpleSoftwareIO\QrCode\Facades\QrCode;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

class TrainsetService extends BaseCrudService implements TrainsetServiceInterface {
    public function __construct(
        protected PresetTrainsetServiceInterface $presetTrainsetService,
        protected CarriageServiceInterface $carriageService,
        protected CarriageTrainsetServiceInterface $carriageTrainsetService,
        protected PanelAttachmentServiceInterface $panelAttachmentService,
        protected SerialPanelServiceInterface $serialPanelService,
        protected TrainsetAttachmentServiceInterface $trainsetAttachmentService,
        protected TrainsetAttachmentComponentGenerator $trainsetAttachmentComponentGenerator,
        protected CarriagePanelServiceInterface $carriagePanelService,
    ) {
        parent::__construct();
    }

    public function updatePreset(Trainset $trainset, array $data): bool {
        return DB::transaction(function () use ($trainset, $data) {
            Model::withoutEvents(function () use ($trainset, $data) {
                // Step 1: Delete nested data related to the carriages
                $preset_trainset_id = $data['preset_trainset_id'];
                $presetTrainset = $this->presetTrainsetService->findOrFail($preset_trainset_id);

                $trainset->carriage_trainsets()->each(function ($carriageTrainset) {
                    $this->carriageTrainsetService->delete($carriageTrainset);
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
            $presetTrainset = $this->presetTrainsetService->create([
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
                $carriage = $this->carriageService->findOrFail($carriageId);
            } else {
                // Step 1: Create a new carriage
                $carriage = $this->carriageService->create([
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

    public function generateTrainsetAttachment(Trainset $trainset, array $data): bool {
        DB::transaction(function () use ($trainset, $data) {
            $division = $data['division'];
            $sourceWorkstationId = $data["{$division}_source_workstation_id"];
            $destinationWorkstationId = $data["{$division}_destination_workstation_id"];

            // $trainset->carriage_trainsets()->each(function ($carriageTrainset) use ($sourceWorkstationId, $destinationWorkstationId) {
                $trainsetAttachment = $this->trainsetAttachmentService->create([
                    'trainset_id' => $trainset->id,
                    'source_workstation_id' => $sourceWorkstationId,
                    'destination_workstation_id' => $destinationWorkstationId,
                    'type' => $division === 'mechanic' ? TrainsetAttachmentTypeEnum::MEKANIK : TrainsetAttachmentTypeEnum::ELEKTRIK,
                ]);

                $trainsetAttachment->update(['attachment_number' => $this->generateAttachmentNumber($trainsetAttachment)]);
                $this->trainsetAttachmentComponentGenerator->generate($trainsetAttachment);

                //            $serialPanelIds = $this->generateSerialPanels($trainsetAttachment, $carriageTrainset);

                //            $serialPanelIdsString = implode(',', $serialPanelIds);
                $qrCode = "KPM:{$trainsetAttachment->attachment_number};P:{$trainset->project->name};TS:{$trainset->name};;";
                $path = "trainset_attachments/qr_images/{$trainsetAttachment->id}.svg";
                $this->generateQrCode($qrCode, $path);

                $trainsetAttachment->update(['qr_code' => $qrCode, 'qr_path' => $path]);
            // });
            $this->checkGeneratedAttachment($trainset);
            // $this->repository->update($trainset, ['status' => TrainsetStatusEnum::PROGRESS]);

        });

        return true;
    }

    public function generatePanelAttachment(Trainset $trainset, array $data): bool {

        DB::transaction(function () use ($trainset, $data) {
            $trainset->carriage_trainsets()->each(function ($carriageTrainset) use ($data) {
                $carriageTrainset->carriage_panels()->each(function ($carriagePanel) use ($data) {
                    $sourceWorkstationId = $data['assembly_source_workstation_id'];
                    $destinationWorkstationId = $data['assembly_destination_workstation_id'];

                    $panelAttachment = $this->panelAttachmentService->create([
                        'carriage_panel_id' => $carriagePanel->id,
                        // 'carriage_trainset_id' => $carriagePanel->carriage_trainset_id,
                        'source_workstation_id' => $sourceWorkstationId,
                        'destination_workstation_id' => $destinationWorkstationId,
                    ]);

                    $panelAttachment->update(['attachment_number' => $this->generateAttachmentNumber($panelAttachment)]);

                    $serialPanelIds = $this->generateSerialPanels($panelAttachment, $carriagePanel);

                    $serialPanelIdsString = implode(',', $serialPanelIds);
                    $qrCode = "KPM:{$panelAttachment->attachment_number};SN:[{$serialPanelIdsString}];P:{$carriagePanel->carriage_trainset->trainset->project->name};TS:{$carriagePanel->carriage_trainset->trainset->name};;";
                    $path = "panel_attachments/qr_images/{$panelAttachment->id}.svg";
                    $this->generateQrCode($qrCode, $path);

                    $panelAttachment->update(['qr_code' => $qrCode, 'qr_path' => $path]);

                    logger('Panel Attachment: ' . $panelAttachment);
                    //                $panelAttachment = $carriagePanel->panel_attachments()->create([
                    //                    'carriage_panel_id' => $carriagePanel->panel_id,
                    //                    'carriage_trainsets_id' => $carriagePanel->carriage_trainset_id,
                    //                    // source_workstation?
                    //                    // dest_workstation?
                    //                    'qr_path' => 'qr_path', // generate qr code
                    //                    'current_step' => 0, // get first step
                    //                    'status' => 'pending', // default status
                    //                    'panel_attachment_id' => null, // default
                    //                    'attachment_number' => null, // default
                    //                    'supervisor_id' => null, // default
                    //                ]);
                    //
                });
            });

            // $this->repository->update($trainset, ['status' => TrainsetStatusEnum::PROGRESS]);
            $this->checkGeneratedAttachment($trainset);

            //            DB::rollBack();
        });

        return true;
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
            $serialPanel = $this->serialPanelService->create([
                'panel_attachment_id' => $panelAttachment->id,
                'manufacture_status' => SerialPanelManufactureStatusEnum::IN_PROGRESS,
            ]);

            $serialPanelIds[] = $serialPanel->id;

            $qrCode = "KPM:{$panelAttachment->attachment_number};SN:{$serialPanel->id};P{$carriagePanel->carriage_trainset->trainset->project->name};TS:{$carriagePanel->carriage_trainset->trainset->name};;";
            $path = "serial_panels/qr_images/{$serialPanel->id}.svg";
            $this->generateQrCode($qrCode, $path);

            $this->serialPanelService->update($serialPanel, ['qr_code' => $qrCode, 'qr_path' => $path]);

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

    private function generateAttachmentNumber(Model $model) {

        if ($model instanceof PanelAttachment) {
            $carriagePanelIds = $this->carriagePanelService->find([
                'carriage_trainset_id' => $model->carriage_panel->carriage_trainset_id,
            ])->pluck('id')->toArray();

            $numberAttachmentOnTrainset = $this->panelAttachmentService->find([
                ['carriage_panel_id', 'in', $carriagePanelIds],
            ]);

            logger('id' . $model->carriage_panel->carriage_trainset_id);

            logger('Number of attachments on trainset: ' . $numberAttachmentOnTrainset);
            $romanNumberAttachmentOnTrainset = NumberHelper::intToRoman($numberAttachmentOnTrainset->count());
            $currentYear = date('Y');
            $attachmentNumber = "{$model->id}/PPC/KPM/{$romanNumberAttachmentOnTrainset}/{$currentYear}";

            return $attachmentNumber;
        }

        $numberAttachmentOnTrainset = $this->trainsetAttachmentService->find([
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
        $carriagePanelsIds = $this->carriagePanelService->find([
            'carriage_trainset_id', 'in', $carriageTrainsetsIds,
        ])->pluck('id')->toArray();

        $totalRequiredAttachment += count($carriagePanelsIds);

        $trainsetAttachments = $this->trainsetAttachmentService->find([
            'trainset_id' => $trainset->id,
        ]);
        $totalGeneratedAttachment = $trainsetAttachments->count(); // should be 2
        
        $panelAttachments = $this->panelAttachmentService->find([
            ['carriage_panel_id', 'in', $carriagePanelsIds],
        ]);
        $totalGeneratedAttachment += $panelAttachments->count();

        if ($totalGeneratedAttachment == $totalRequiredAttachment) {
            $this->repository->update($trainset, ['status' => TrainsetStatusEnum::PROGRESS]);
        }
    }

    public function delete($keyOrModel): bool {
        if (!$keyOrModel->canBeDeleted()) {
            abort(402, __('exception.services.trainset_service.delete.trainset_in_progress_exception'));
        }

        $keyOrModel->carriage_trainsets()->each(function ($carriageTrainset) {
            $this->carriageTrainsetService->delete($carriageTrainset);
        });

        return parent::delete($keyOrModel);
    }

    protected function getRepositoryClass(): string {
        return TrainsetRepositoryInterface::class;
    }
}
