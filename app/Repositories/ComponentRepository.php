<?php

namespace App\Repositories;

use App\Models\Component;
use App\Support\Interfaces\Repositories\ComponentRepositoryInterface;

class ComponentRepository extends BaseRepository implements ComponentRepositoryInterface {
    protected function getModelClass(): string {
        return Component::class;
    }
}
