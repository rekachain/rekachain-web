<?php

namespace App\Repositories;

use App\Models\Carriage;
use App\Support\Interfaces\Repositories\CarriageRepositoryInterface;

class CarriageRepository extends BaseRepository implements CarriageRepositoryInterface {
    protected function getModelClass(): string {
        return Carriage::class;
    }
}
