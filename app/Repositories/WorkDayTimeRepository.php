<?php

namespace App\Repositories;

use App\Models\WorkDayTime;
use App\Support\Interfaces\Repositories\WorkDayTimeRepositoryInterface;

class WorkDayTimeRepository extends BaseRepository implements WorkDayTimeRepositoryInterface {
    protected function getModelClass(): string {
        return WorkDayTime::class;
    }
}
