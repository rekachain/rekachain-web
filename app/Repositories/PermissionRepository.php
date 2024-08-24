<?php

namespace App\Repositories;

use Adobrovolsky97\LaravelRepositoryServicePattern\Repositories\BaseRepository;
use App\Models\Permission;
use App\Support\Interfaces\Repositories\PermissionRepositoryInterface;
use Illuminate\Database\Eloquent\Builder;

class PermissionRepository extends BaseRepository implements PermissionRepositoryInterface {
    protected function getModelClass(): string {
        return Permission::class;
    }

    protected function applyFilters(array $searchParams = []): Builder {
        $query = $this->getQuery();

        if (isset($searchParams['name'])) {
            $query->where('name', 'like', '%' . $searchParams['name'] . '%');
        }

        $query->orderBy('name', 'desc');

        return $query;
    }
}
