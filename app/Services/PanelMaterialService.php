<?php

namespace App\Services;

use App\Support\Interfaces\Repositories\PanelMaterialRepositoryInterface;
use App\Support\Interfaces\Services\PanelMaterialServiceInterface;

class PanelMaterialService extends BaseCrudService implements PanelMaterialServiceInterface {
    protected function getRepositoryClass(): string {
        return PanelMaterialRepositoryInterface::class;
    }
}
