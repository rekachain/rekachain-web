<?php

namespace App\Services;

use Adobrovolsky97\LaravelRepositoryServicePattern\Services\BaseCrudService;
use App\Support\Interfaces\PanelMaterialRepositoryInterface;
use App\Support\Interfaces\PanelMaterialServiceInterface;

class PanelMaterialService extends BaseCrudService implements PanelMaterialServiceInterface {
    protected function getRepositoryClass(): string {
        return PanelMaterialRepositoryInterface::class;
    }
}
