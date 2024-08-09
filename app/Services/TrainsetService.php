<?php

namespace App\Services;

use Adobrovolsky97\LaravelRepositoryServicePattern\Services\BaseCrudService;
use App\Support\Interfaces\TrainsetRepositoryInterface;
use App\Support\Interfaces\TrainsetServiceInterface;

class TrainsetService extends BaseCrudService implements TrainsetServiceInterface {
    protected function getRepositoryClass(): string {
        return TrainsetRepositoryInterface::class;
    }
}
