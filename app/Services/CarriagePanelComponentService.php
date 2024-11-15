<?php

namespace App\Services;

use Adobrovolsky97\LaravelRepositoryServicePattern\Services\BaseCrudService;
use App\Imports\CarriagePanelComponent\CarriagePanelComponentProgressMaterialImport;
use App\Models\CarriagePanelComponent;
use App\Support\Interfaces\Repositories\CarriagePanelComponentRepositoryInterface;
use App\Support\Interfaces\Services\CarriagePanelComponentServiceInterface;
use App\Support\Interfaces\Services\RawMaterialServiceInterface;
use DB;
use Illuminate\Http\UploadedFile;
use Maatwebsite\Excel\Facades\Excel;

class CarriagePanelComponentService extends BaseCrudService implements CarriagePanelComponentServiceInterface {
    public function __construct(
        protected RawMaterialServiceInterface $rawMaterialService,
    ) {
        parent::__construct();
    }

    public function addRawMaterial(CarriagePanelComponent $carriagePanelComponent, array $data): bool {
        return DB::transaction(function () use ($carriagePanelComponent, $data) {
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
                    'code' => $newRawMaterialCode,
                    'description' => $newRawMaterialDescription,
                    'unit' => $newRawMaterialUnit,
                    'specs' => $newRawMaterialSpecs,
                ]);
            }

            $carriagePanelComponent->component_materials()->create([
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

    protected function getRepositoryClass(): string {
        return CarriagePanelComponentRepositoryInterface::class;
    }

    public function importProgressMaterialData(UploadedFile $file, CarriagePanelComponent $carriagePanelComponent, int $workAspectId): bool {
        Excel::import(new CarriagePanelComponentProgressMaterialImport($carriagePanelComponent, $workAspectId), $file);

        return true;
    }
}
