<?php

namespace App\Services;

use App\Support\Interfaces\Repositories\FailedComponentManufactureRepositoryInterface;
use App\Support\Interfaces\Services\FailedComponentManufactureServiceInterface;

class FailedComponentManufactureService extends BaseCrudService implements FailedComponentManufactureServiceInterface {
    protected function getRepositoryClass(): string {
        return FailedComponentManufactureRepositoryInterface::class;
    }
}
