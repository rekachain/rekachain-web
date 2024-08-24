<?php

namespace App\Services;

use Adobrovolsky97\LaravelRepositoryServicePattern\Services\BaseCrudService;
use App\Support\Interfaces\Repositories\PanelMaterialRepositoryInterface;
use App\Support\Interfaces\Services\PanelMaterialServiceInterface;

class PanelMaterialService extends BaseCrudService implements PanelMaterialServiceInterface {
    protected function getRepositoryClass(): string {
        return PanelMaterialRepositoryInterface::class;
    }
}
