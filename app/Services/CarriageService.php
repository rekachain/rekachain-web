<?php

namespace App\Services;

use Adobrovolsky97\LaravelRepositoryServicePattern\Services\BaseCrudService;
use App\Support\Interfaces\CarriageRepositoryInterface;
use App\Support\Interfaces\CarriageServiceInterface;

class CarriageService extends BaseCrudService implements CarriageServiceInterface {
    protected function getRepositoryClass(): string {
        return CarriageRepositoryInterface::class;
    }
}
