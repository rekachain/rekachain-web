<?php

namespace App\Services;

use Adobrovolsky97\LaravelRepositoryServicePattern\Services\BaseCrudService;
use App\Imports\CarriagePanel\CarriagePanelProgressMaterialImport;
use App\Models\CarriagePanel;
use App\Support\Interfaces\Repositories\CarriagePanelRepositoryInterface;
use App\Support\Interfaces\Services\CarriagePanelComponentServiceInterface;
use App\Support\Interfaces\Services\CarriagePanelServiceInterface;
use App\Support\Interfaces\Services\ComponentServiceInterface;
use App\Support\Interfaces\Services\PanelAttachmentServiceInterface;
use App\Support\Interfaces\Services\PanelMaterialServiceInterface;
use App\Support\Interfaces\Services\ProgressServiceInterface;
use App\Support\Interfaces\Services\RawMaterialServiceInterface;
use DB;
use Illuminate\Http\UploadedFile;
use Maatwebsite\Excel\Facades\Excel;

class CarriagePanelService extends BaseCrudService implements CarriagePanelServiceInterface {
    public function __construct(
        protected CarriagePanelComponentServiceInterface $carriagePanelComponentService,
        protected PanelMaterialServiceInterface $panelMaterialService,
        protected PanelAttachmentServiceInterface $panelAttachmentService,
        protected ComponentServiceInterface $componentService,
        protected RawMaterialServiceInterface $rawMaterialService,
        protected ProgressServiceInterface $progressService,
    ) {
        parent::__construct();
    }

    protected function getRepositoryClass(): string {
        return CarriagePanelRepositoryInterface::class;
    }

    public function importProgressMaterialData(UploadedFile $file, CarriagePanel $carriagePanel): bool {
        Excel::import(new CarriagePanelProgressMaterialImport($carriagePanel), $file);

        return true;
    }

    public function addComponent(CarriagePanel $carriagePanel, array $data): bool {
        return DB::transaction(function () use ($carriagePanel, $data) {
            $componentId = $data['component_id'];
            $progressId = $data['component_progress_id'];
            $componentName = $data['component_name'];
            $componentDescription = $data['component_description'];
            $carriagePanelQty = $data['carriage_component_qty'];

            if ($componentId) {
                $component = $this->componentService->findOrFail($componentId);
            } else {
                $component = $this->componentService->create([
                    'name' => $componentName,
                    'description' => $componentDescription,
                ]);
            }

            $carriagePanel->carriage_panel_components()->create([
                'component_id' => $component->id,
                'progress_id' => $progressId,
                'carriage_trainset_id' => null,
                'qty' => $carriagePanelQty,
            ]);

            // TODO: change trainset_preset_id to null?

            //            $carriagePanel->trainset()->update(['preset_trainset_id' => null]);

            return true;
        });
    }

    public function addRawMaterial(CarriagePanel $carriagePanel, array $data): bool {
        return DB::transaction(function () use ($carriagePanel, $data) {
            $rawMaterialId = $data['raw_material_id'];
            $newRawMaterialCode = $data['new_raw_material_code'];
            $newRawMaterialDescription = $data['new_raw_material_description'];
            $newRawMaterialUnit = $data['new_raw_material_unit'];
            $newRawMaterialSpecs = $data['new_raw_material_specs'];
            $newRawMaterialQty = $data['new_raw_material_qty'];

            if ($rawMaterialId) {
                $rawMaterial = $this->rawMaterialService->findOrFail($rawMaterialId);
            } else {
                $rawMaterial = $this->rawMaterialService->create([
                    'material_code' => $newRawMaterialCode,
                    'description' => $newRawMaterialDescription,
                    'unit' => $newRawMaterialUnit,
                    'specs' => $newRawMaterialSpecs,
                ]);
            }

            $carriagePanel->panel_materials()->create([
                'raw_material_id' => $rawMaterial->id,
                'qty' => $newRawMaterialQty,
            ]);
            //
            //            $carriagePanel->carriage_panel_components()->create([
            //                'component_id' => $rawMaterial->id,
            //                'progress_id' => $progressId,
            //                'carriage_trainset_id' => null,
            //                'qty' => $carriagePanelQty,
            //            ]);

            // TODO: change trainset_preset_id to null?

            //            $carriagePanel->trainset()->update(['preset_trainset_id' => null]);

            return true;
        });
    }

    public function changeProgress(CarriagePanel $carriagePanel, array $data): bool {
        return DB::transaction(function () use ($carriagePanel, $data) {
            $progressId = $data['progress_id'];
            $progressName = $data['progress_name'];
            $progressWorkAspectId = $data['progress_work_aspect_id'];

            if ($progressId) {
                $progress = $this->progressService->findOrFail($progressId);
            } else {
                $progress = $this->progressService->create([
                    'name' => $progressName,
                    'work_aspect_id' => $progressWorkAspectId,
                ]);
            }

            $carriagePanel->update([
                'progress_id' => $progress->id,
            ]);

            return true;
        });
    }

    /**
     * @param  int|CarriagePanel  $keyOrModel
     *
     * @throws \Exception
     */
    public function delete($keyOrModel): bool {
        //        $keyOrModel->panel_attachment()->each(function ($attachment) {
        //            $this->panelAttachmentService->delete($attachment);
        //        });
        $keyOrModel->carriage_panel_components()->each(function ($component) {
            $this->carriagePanelComponentService->delete($component);
        });

        $keyOrModel->panel_materials()->each(function ($material) {
            $this->panelMaterialService->delete($material);
        });

        // TODO: update trainset_preset_id to null

        return parent::delete($keyOrModel);
    }
}
