<?php

namespace App\Support\Interfaces\Services;

use Adobrovolsky97\LaravelRepositoryServicePattern\Services\Contracts\BaseCrudServiceInterface;
use App\Models\CarriagePanelComponent;
use Illuminate\Http\UploadedFile;

interface CarriagePanelComponentServiceInterface extends BaseCrudServiceInterface {
    public function importProgressMaterialData(UploadedFile $file, CarriagePanelComponent $carriagePanelComponent, int $workAspectId): bool;

    /**
     * add raw material to panel component
     *
     * required data:
     * - new_raw_material_code
     * - new_raw_material_description
     * - new_raw_material_unit
     * - new_raw_material_specs
     * - new_raw_material_qty
     *
     * optional data:
     * - raw_material_id
     */
    public function addRawMaterial(CarriagePanelComponent $carriagePanelComponent, array $data): bool;

    /**
     * change progress of panel component
     *
     * required data:
     * - progress_id
     * - progress_name
     * - progress_work_aspect_id
     */
    public function changeProgress(CarriagePanelComponent $carriagePanelComponent, array $data): bool;
}
