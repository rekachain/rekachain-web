<?php

namespace App\Services;

use App\Support\Interfaces\Repositories\WorkstationRepositoryInterface;
use App\Support\Interfaces\Services\WorkstationServiceInterface;

class WorkstationService extends BaseCrudService implements WorkstationServiceInterface {
    protected function getRepositoryClass(): string {
        return WorkstationRepositoryInterface::class;
    }
}
