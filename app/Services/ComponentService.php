<?php

namespace App\Services;

use Adobrovolsky97\LaravelRepositoryServicePattern\Services\BaseCrudService;
use App\Support\Interfaces\ComponentRepositoryInterface;
use App\Support\Interfaces\ComponentServiceInterface;

class ComponentService extends BaseCrudService implements ComponentServiceInterface {
    protected function getRepositoryClass(): string {
        return ComponentRepositoryInterface::class;
    }
}
