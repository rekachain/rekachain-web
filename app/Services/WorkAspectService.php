<?php

namespace App\Services;

use Adobrovolsky97\LaravelRepositoryServicePattern\Services\BaseCrudService;
use App\Support\Interfaces\Repositories\WorkAspectRepositoryInterface;
use App\Support\Interfaces\Services\WorkAspectServiceInterface;

class WorkAspectService extends BaseCrudService implements WorkAspectServiceInterface {
    protected function getRepositoryClass(): string {
        return WorkAspectRepositoryInterface::class;
    }
}
