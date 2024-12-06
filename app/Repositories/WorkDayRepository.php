<?php

namespace App\Repositories;

use App\Models\WorkDay;
use App\Support\Interfaces\Repositories\WorkDayRepositoryInterface;

class WorkDayRepository extends BaseRepository implements WorkDayRepositoryInterface {
    protected function getModelClass(): string {
        return WorkDay::class;
    }
}
