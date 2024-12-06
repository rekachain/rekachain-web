<?php

namespace App\Services;

use App\Support\Interfaces\Repositories\WorkshopRepositoryInterface;
use App\Support\Interfaces\Services\WorkshopServiceInterface;

class WorkshopService extends BaseCrudService implements WorkshopServiceInterface {
    protected function getRepositoryClass(): string {
        return WorkshopRepositoryInterface::class;
    }
}
