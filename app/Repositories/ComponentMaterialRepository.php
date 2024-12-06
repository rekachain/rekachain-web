<?php

namespace App\Repositories;

use App\Models\ComponentMaterial;
use App\Support\Interfaces\Repositories\ComponentMaterialRepositoryInterface;

class ComponentMaterialRepository extends BaseRepository implements ComponentMaterialRepositoryInterface {
    protected function getModelClass(): string {
        return ComponentMaterial::class;
    }
}
