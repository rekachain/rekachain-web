<?php

namespace App\Services;

use Adobrovolsky97\LaravelRepositoryServicePattern\Services\BaseCrudService;
use App\Support\Interfaces\TrainsetCarriagesRepositoryInterface;
use App\Support\Interfaces\TrainsetCarriagesServiceInterface;

class TrainsetCarriagesService extends BaseCrudService implements TrainsetCarriagesServiceInterface {
    protected function getRepositoryClass(): string {
        return TrainsetCarriagesRepositoryInterface::class;
    }
}
