<?php

namespace App\Repositories;

use Adobrovolsky97\LaravelRepositoryServicePattern\Repositories\BaseRepository;
use App\Models\Workshop;
use App\Support\Interfaces\Repositories\WorkshopRepositoryInterface;

class WorkshopRepository extends BaseRepository implements WorkshopRepositoryInterface {
    protected function getModelClass(): string {
        return Workshop::class;
    }
}
