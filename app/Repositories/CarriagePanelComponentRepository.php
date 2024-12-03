<?php

namespace App\Repositories;

use App\Models\CarriagePanelComponent;
use App\Support\Interfaces\Repositories\CarriagePanelComponentRepositoryInterface;

class CarriagePanelComponentRepository extends BaseRepository implements CarriagePanelComponentRepositoryInterface {
    protected function getModelClass(): string {
        return CarriagePanelComponent::class;
    }
}
