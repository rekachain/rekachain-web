<?php

namespace App\Repositories;

use App\Models\Progress;
use App\Support\Interfaces\Repositories\ProgressRepositoryInterface;

class ProgressRepository extends BaseRepository implements ProgressRepositoryInterface {
    protected function getModelClass(): string {
        return Progress::class;
    }
}
