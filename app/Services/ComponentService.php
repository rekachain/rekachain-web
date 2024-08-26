<?php

namespace App\Services;

use Adobrovolsky97\LaravelRepositoryServicePattern\Services\BaseCrudService;
use App\Support\Interfaces\Repositories\ComponentRepositoryInterface;
use App\Support\Interfaces\Services\ComponentServiceInterface;

class ComponentService extends BaseCrudService implements ComponentServiceInterface {
    protected function getRepositoryClass(): string {
        return ComponentRepositoryInterface::class;
    }
}
