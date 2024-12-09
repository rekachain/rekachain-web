<?php

namespace App\Repositories;

use App\Models\CarriagePreset;
use App\Support\Interfaces\Repositories\CarriagePresetRepositoryInterface;

class CarriagePresetRepository extends BaseRepository implements CarriagePresetRepositoryInterface {
    protected function getModelClass(): string {
        return CarriagePreset::class;
    }
}
