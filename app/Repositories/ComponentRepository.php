<?php

namespace App\Repositories;

use Adobrovolsky97\LaravelRepositoryServicePattern\Repositories\BaseRepository;
use App\Models\Component;
use App\Support\Interfaces\ComponentRepositoryInterface;

class ComponentRepository extends BaseRepository implements ComponentRepositoryInterface {
    protected function getModelClass(): string {
        return Component::class;
    }
}
