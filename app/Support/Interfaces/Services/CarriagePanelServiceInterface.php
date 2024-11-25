<?php

namespace App\Support\Interfaces\Services;

use Adobrovolsky97\LaravelRepositoryServicePattern\Services\Contracts\BaseCrudServiceInterface;
use App\Models\CarriagePanel;
use Illuminate\Http\UploadedFile;

interface CarriagePanelServiceInterface extends BaseCrudServiceInterface {
    public function importProgressMaterialData(UploadedFile $file, CarriagePanel $carriagePanel): bool;

    /**
     * add component to panel
     *
     * required data:
     * - progress_id
     * - component_name
     * - component_description
     * - component_qty
     *
     * optional data:
     * - component_id
     */
    public function addComponent(CarriagePanel $carriagePanel, array $data): bool;

    /**
     * add raw material to carriage panel
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
    public function addRawMaterial(CarriagePanel $carriagePanel, array $data): bool;

    /**
     * change progress of carriage panel
     *
     * required data:
     * - progress_id
     * - progress_name
     * - progress_work_aspect_id
     */
    public function changeProgress(CarriagePanel $carriagePanel, array $data): bool;
}
