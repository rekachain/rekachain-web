<?php

namespace App\Support\Interfaces\Services;

use Adobrovolsky97\LaravelRepositoryServicePattern\Services\Contracts\BaseCrudServiceInterface;
use App\Models\ComponentMaterial;

interface ComponentMaterialServiceInterface extends BaseCrudServiceInterface {
    /**
     * add panel to carriage
     *
     * required data:
     * - progress_id
     * - panel_name
     * - panel_description
     * - panel_qty
     *
     * optional data:
     * - panel_id
     */
    // public function addPanel(ComponentMaterial $componentMaterial, array $data): bool;
}
