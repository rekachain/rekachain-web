<?php

namespace App\Services;

use Adobrovolsky97\LaravelRepositoryServicePattern\Services\BaseCrudService;
use App\Support\Interfaces\PresetTrainsetRepositoryInterface;
use App\Support\Interfaces\PresetTrainsetServiceInterface;

class PresetTrainsetService extends BaseCrudService implements PresetTrainsetServiceInterface {
    protected function getRepositoryClass(): string {
        return PresetTrainsetRepositoryInterface::class;
    }
}
