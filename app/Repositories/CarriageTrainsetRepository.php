<?php

namespace App\Repositories;

use App\Models\CarriageTrainset;
use App\Support\Interfaces\Repositories\CarriageTrainsetRepositoryInterface;

class CarriageTrainsetRepository extends BaseRepository implements CarriageTrainsetRepositoryInterface {
    protected function getModelClass(): string {
        return CarriageTrainset::class;
    }
}
