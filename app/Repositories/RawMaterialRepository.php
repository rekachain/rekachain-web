<?php

namespace App\Repositories;

use Adobrovolsky97\LaravelRepositoryServicePattern\Repositories\BaseRepository;
use App\Models\RawMaterial;
use App\Support\Interfaces\RawMaterialRepositoryInterface;

class RawMaterialRepository extends BaseRepository implements RawMaterialRepositoryInterface {
    protected function getModelClass(): string {
        return RawMaterial::class;
    }
}