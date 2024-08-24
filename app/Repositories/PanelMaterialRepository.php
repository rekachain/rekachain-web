<?php

namespace App\Repositories;

use Adobrovolsky97\LaravelRepositoryServicePattern\Repositories\BaseRepository;
use App\Models\PanelMaterial;
use App\Support\Interfaces\Repositories\PanelMaterialRepositoryInterface;

class PanelMaterialRepository extends BaseRepository implements PanelMaterialRepositoryInterface {
    protected function getModelClass(): string {
        return PanelMaterial::class;
    }
}
