<?php

namespace App\Services;

use Adobrovolsky97\LaravelRepositoryServicePattern\Services\BaseCrudService;
use App\Support\Interfaces\WorkstationRepositoryInterface;
use App\Support\Interfaces\WorkstationServiceInterface;

class WorkstationService extends BaseCrudService implements WorkstationServiceInterface {
    protected function getRepositoryClass(): string {
        return WorkstationRepositoryInterface::class;
    }
}