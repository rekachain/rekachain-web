<?php

namespace App\Repositories;

use App\Models\Workstation;
use App\Support\Interfaces\Repositories\WorkstationRepositoryInterface;

class WorkstationRepository extends BaseRepository implements WorkstationRepositoryInterface {
    protected function getModelClass(): string {
        return Workstation::class;
    }
}
