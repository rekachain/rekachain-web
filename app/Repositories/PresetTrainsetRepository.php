<?php

namespace App\Repositories;

use Adobrovolsky97\LaravelRepositoryServicePattern\Repositories\BaseRepository;
use App\Models\PresetTrainset;
use App\Support\Interfaces\PresetTrainsetRepositoryInterface;

class PresetTrainsetRepository extends BaseRepository implements PresetTrainsetRepositoryInterface {
    protected function getModelClass(): string {
        return PresetTrainset::class;
    }
}
