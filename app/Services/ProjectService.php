<?php

namespace App\Services;

use Adobrovolsky97\LaravelRepositoryServicePattern\Services\BaseCrudService;
use App\Support\Interfaces\ProjectRepositoryInterface;
use App\Support\Interfaces\ProjectServiceInterface;

class ProjectService extends BaseCrudService implements ProjectServiceInterface {
    protected function getRepositoryClass(): string {
        return ProjectRepositoryInterface::class;
    }
}
