<?php

namespace App\Repositories;

use App\Models\WorkAspect;
use App\Support\Interfaces\Repositories\WorkAspectRepositoryInterface;

class WorkAspectRepository extends BaseRepository implements WorkAspectRepositoryInterface {
    protected function getModelClass(): string {
        return WorkAspect::class;
    }
}
