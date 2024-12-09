<?php

namespace App\Repositories;

use App\Models\Trainset;
use App\Support\Interfaces\Repositories\TrainsetRepositoryInterface;

class TrainsetRepository extends BaseRepository implements TrainsetRepositoryInterface {
    protected function getModelClass(): string {
        return Trainset::class;
    }
}
