<?php

namespace App\Repositories;

use Adobrovolsky97\LaravelRepositoryServicePattern\Repositories\BaseRepository;
use App\Models\Progress;
use App\Support\Interfaces\ProgressRepositoryInterface;

class ProgressRepository extends BaseRepository implements ProgressRepositoryInterface {
    protected function getModelClass(): string {
        return Progress::class;
    }
}
