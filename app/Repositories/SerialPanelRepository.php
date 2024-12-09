<?php

namespace App\Repositories;

use App\Models\SerialPanel;
use App\Support\Interfaces\Repositories\SerialPanelRepositoryInterface;

class SerialPanelRepository extends BaseRepository implements SerialPanelRepositoryInterface {
    protected function getModelClass(): string {
        return SerialPanel::class;
    }
}
