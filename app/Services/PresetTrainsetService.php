<?php

namespace App\Services;

use Adobrovolsky97\LaravelRepositoryServicePattern\Services\BaseCrudService;
use App\Support\Interfaces\Repositories\PresetTrainsetRepositoryInterface;
use App\Support\Interfaces\Services\PresetTrainsetServiceInterface;

class PresetTrainsetService extends BaseCrudService implements PresetTrainsetServiceInterface {
    protected function getRepositoryClass(): string {
        return PresetTrainsetRepositoryInterface::class;
    }
}
