<?php

namespace App\Repositories;

use App\Models\FailedComponentManufacture;
use App\Support\Interfaces\Repositories\FailedComponentManufactureRepositoryInterface;

class FailedComponentManufactureRepository extends BaseRepository implements FailedComponentManufactureRepositoryInterface {
    protected function getModelClass(): string {
        return FailedComponentManufacture::class;
    }
}
