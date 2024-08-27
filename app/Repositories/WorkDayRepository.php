<?php

namespace App\Repositories;

use Adobrovolsky97\LaravelRepositoryServicePattern\Repositories\BaseRepository;
use App\Models\WorkDay;
use App\Support\Interfaces\Repositories\WorkDayRepositoryInterface;

class WorkDayRepository extends BaseRepository implements WorkDayRepositoryInterface {
    protected function getModelClass(): string {
        return WorkDay::class;
    }
}
