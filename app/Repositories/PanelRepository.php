<?php

namespace App\Repositories;

use App\Models\Panel;
use App\Support\Interfaces\Repositories\PanelRepositoryInterface;

class PanelRepository extends BaseRepository implements PanelRepositoryInterface {
    protected function getModelClass(): string {
        return Panel::class;
    }
}
