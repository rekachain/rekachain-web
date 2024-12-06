<?php

namespace App\Repositories;

use App\Models\Workshop;
use App\Support\Interfaces\Repositories\WorkshopRepositoryInterface;

class WorkshopRepository extends BaseRepository implements WorkshopRepositoryInterface {
    protected function getModelClass(): string {
        return Workshop::class;
    }
}
