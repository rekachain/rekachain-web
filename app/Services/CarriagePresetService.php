<?php

namespace App\Services;

use App\Support\Interfaces\Repositories\CarriagePresetRepositoryInterface;
use App\Support\Interfaces\Services\CarriagePresetServiceInterface;

class CarriagePresetService extends BaseCrudService implements CarriagePresetServiceInterface {
    protected function getRepositoryClass(): string {
        return CarriagePresetRepositoryInterface::class;
    }
}
