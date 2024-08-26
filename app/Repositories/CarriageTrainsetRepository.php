<?php

namespace App\Repositories;

use Adobrovolsky97\LaravelRepositoryServicePattern\Repositories\BaseRepository;
use App\Models\CarriageTrainset;
use App\Support\Interfaces\Repositories\CarriageTrainsetRepositoryInterface;

class CarriageTrainsetRepository extends BaseRepository implements CarriageTrainsetRepositoryInterface {
    protected function getModelClass(): string {
        return CarriageTrainset::class;
    }
}
