<?php

namespace App\Repositories;

use Adobrovolsky97\LaravelRepositoryServicePattern\Repositories\BaseRepository;
use App\Models\Division;
use App\Support\Interfaces\Repositories\DivisionRepositoryInterface;

class DivisionRepository extends BaseRepository implements DivisionRepositoryInterface {
    protected function getModelClass(): string {
        return Division::class;
    }
}
