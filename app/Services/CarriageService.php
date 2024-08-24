<?php

namespace App\Services;

use Adobrovolsky97\LaravelRepositoryServicePattern\Services\BaseCrudService;
use App\Support\Interfaces\Repositories\CarriageRepositoryInterface;
use App\Support\Interfaces\Services\CarriageServiceInterface;

class CarriageService extends BaseCrudService implements CarriageServiceInterface {
    protected function getRepositoryClass(): string {
        return CarriageRepositoryInterface::class;
    }
}
