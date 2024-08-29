<?php

namespace App\Repositories;

use Adobrovolsky97\LaravelRepositoryServicePattern\Repositories\BaseRepository;
use App\Models\CarriagePanelComponent;
use App\Support\Interfaces\Repositories\CarriagePanelRepositoryInterface;

class CarriagePanelComponentRepository extends BaseRepository implements CarriagePanelRepositoryInterface {
    protected function getModelClass(): string {
        return CarriagePanelComponent::class;
    }
}
