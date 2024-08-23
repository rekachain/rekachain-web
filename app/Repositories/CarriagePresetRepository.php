<?php

namespace App\Repositories;

use Adobrovolsky97\LaravelRepositoryServicePattern\Repositories\BaseRepository;
use App\Models\CarriagePreset;
use App\Support\Interfaces\CarriagePresetRepositoryInterface;

class CarriagePresetRepository extends BaseRepository implements CarriagePresetRepositoryInterface {
    protected function getModelClass(): string {
        return CarriagePreset::class;
    }
}
