<?php

namespace App\Services;

use Adobrovolsky97\LaravelRepositoryServicePattern\Services\BaseCrudService;
use App\Support\Interfaces\Repositories\ComponentMaterialRepositoryInterface;
use App\Support\Interfaces\Services\ComponentMaterialServiceInterface;

class ComponentMaterialService extends BaseCrudService implements ComponentMaterialServiceInterface {
    protected function getRepositoryClass(): string {
        return ComponentMaterialRepositoryInterface::class;
    }
}
