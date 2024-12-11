<?php

namespace App\Repositories;

use App\Models\Step;
use App\Support\Interfaces\Repositories\StepRepositoryInterface;

class StepRepository extends BaseRepository implements StepRepositoryInterface {
    protected function getModelClass(): string {
        return Step::class;
    }
}
