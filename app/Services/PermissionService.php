<?php

namespace App\Services;

use Adobrovolsky97\LaravelRepositoryServicePattern\Services\BaseCrudService;
use App\Support\Interfaces\PermissionRepositoryInterface;
use App\Support\Interfaces\PermissionServiceInterface;

class PermissionService extends BaseCrudService implements PermissionServiceInterface {
    protected function getRepositoryClass(): string {
        return PermissionRepositoryInterface::class;
    }
}
