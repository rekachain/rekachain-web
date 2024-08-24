<?php

namespace App\Services;

use Adobrovolsky97\LaravelRepositoryServicePattern\Services\BaseCrudService;
use App\Support\Interfaces\Repositories\RawMaterialRepositoryInterface;
use App\Support\Interfaces\Services\RawMaterialServiceInterface;

class RawMaterialService extends BaseCrudService implements RawMaterialServiceInterface {
    protected function getRepositoryClass(): string {
        return RawMaterialRepositoryInterface::class;
    }
}
