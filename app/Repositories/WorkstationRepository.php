<?php

namespace App\Repositories;

use Adobrovolsky97\LaravelRepositoryServicePattern\Repositories\BaseRepository;
use App\Models\Workstation;
use App\Support\Interfaces\WorkstationRepositoryInterface;
use App\Traits\Repositories\HandlesRelations;
use Illuminate\Database\Eloquent\Builder;

class WorkstationRepository extends BaseRepository implements WorkstationRepositoryInterface {
    use HandlesRelations;

    protected function getModelClass(): string {
        return Workstation::class;
    }

    protected function applyFilters(array $searchParams = []): Builder {
        $query = $this->getQuery();

        if (isset($searchParams['name'])) {
            $query->where('name', 'like', '%' . $searchParams['name'] . '%');
        }

        $this->applyResolvedRelations($query, $searchParams);

        return $query;
    }
}
