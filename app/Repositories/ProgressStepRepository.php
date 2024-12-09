<?php

namespace App\Repositories;

use App\Models\ProgressStep;
use App\Support\Interfaces\Repositories\ProgressStepRepositoryInterface;

class ProgressStepRepository extends BaseRepository implements ProgressStepRepositoryInterface {
    protected function getModelClass(): string {
        return ProgressStep::class;
    }
}
