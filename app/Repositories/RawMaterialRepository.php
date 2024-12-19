<?php

namespace App\Repositories;

use App\Models\RawMaterial;
use App\Support\Interfaces\Repositories\RawMaterialRepositoryInterface;

class RawMaterialRepository extends BaseRepository implements RawMaterialRepositoryInterface {
    protected function getModelClass(): string {
        return RawMaterial::class;
    }
}
