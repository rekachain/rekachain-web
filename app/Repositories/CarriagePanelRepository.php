<?php

namespace App\Repositories;

use App\Models\CarriagePanel;
use App\Support\Interfaces\Repositories\CarriagePanelRepositoryInterface;

class CarriagePanelRepository extends BaseRepository implements CarriagePanelRepositoryInterface {
    protected function getModelClass(): string {
        return CarriagePanel::class;
    }
}
