<?php

namespace App\Repositories;

use Adobrovolsky97\LaravelRepositoryServicePattern\Repositories\BaseRepository;
use App\Models\TrainsetCarriages;
use App\Support\Interfaces\TrainsetCarriagesRepositoryInterface;

class TrainsetCarriagesRepository extends BaseRepository implements TrainsetCarriagesRepositoryInterface {
    protected function getModelClass(): string {
        return TrainsetCarriages::class;
    }
}
