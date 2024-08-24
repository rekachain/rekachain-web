<?php

namespace App\Services;

use Adobrovolsky97\LaravelRepositoryServicePattern\Services\BaseCrudService;
use App\Support\Interfaces\Repositories\CarriageTrainsetRepositoryInterface;
use App\Support\Interfaces\Services\CarriageTrainsetServiceInterface;

class CarriageTrainsetService extends BaseCrudService implements CarriageTrainsetServiceInterface {
    protected function getRepositoryClass(): string {
        return CarriageTrainsetRepositoryInterface::class;
    }
}
