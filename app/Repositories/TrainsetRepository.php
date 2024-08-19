<?php

namespace App\Repositories;

use Adobrovolsky97\LaravelRepositoryServicePattern\Repositories\BaseRepository;
use App\Models\Trainset;
use App\Support\Interfaces\TrainsetRepositoryInterface;
use Illuminate\Database\Eloquent\Model;

class TrainsetRepository extends BaseRepository implements TrainsetRepositoryInterface {
    protected function getModelClass(): string {
        return Trainset::class;
    }
}
