<?php

namespace App\Repositories;

use Adobrovolsky97\LaravelRepositoryServicePattern\Repositories\BaseRepository;
use App\Models\Panel;
use App\Support\Interfaces\PanelRepositoryInterface;

class PanelRepository extends BaseRepository implements PanelRepositoryInterface {
    protected function getModelClass(): string {
        return Panel::class;
    }
}
