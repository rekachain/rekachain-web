<?php

namespace App\Services;

use App\Support\Interfaces\Repositories\PresetTrainsetRepositoryInterface;
use App\Support\Interfaces\Services\PresetTrainsetServiceInterface;

class PresetTrainsetService extends BaseCrudService implements PresetTrainsetServiceInterface {
    protected function getRepositoryClass(): string {
        return PresetTrainsetRepositoryInterface::class;
    }
}
