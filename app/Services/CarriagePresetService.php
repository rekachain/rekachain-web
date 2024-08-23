<?php

namespace App\Services;

use Adobrovolsky97\LaravelRepositoryServicePattern\Services\BaseCrudService;
use App\Support\Interfaces\CarriagePresetRepositoryInterface;
use App\Support\Interfaces\CarriagePresetServiceInterface;

class CarriagePresetService extends BaseCrudService implements CarriagePresetServiceInterface {
    protected function getRepositoryClass(): string {
        return CarriagePresetRepositoryInterface::class;
    }
}
