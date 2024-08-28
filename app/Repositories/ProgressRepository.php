<?php

namespace App\Repositories;

use Adobrovolsky97\LaravelRepositoryServicePattern\Repositories\BaseRepository;
use App\Models\Progress;
use App\Support\Interfaces\Repositories\ProgressRepositoryInterface;
use App\Traits\Repositories\HandlesRelations;
use App\Traits\Repositories\HandlesSorting;
use Illuminate\Database\Eloquent\Builder;

class ProgressRepository extends BaseRepository implements ProgressRepositoryInterface {
    use HandlesRelations, HandlesSorting;

    protected function getModelClass(): string {
        return Progress::class;
    }

    protected function applyFilters(array $searchParams = []): Builder {
        $query = $this->getQuery();

        if (isset($searchParams['name'])) {
            $query->where('name', 'like', '%' . $searchParams['name'] . '%');
        }

        $query = $this->applyResolvedRelations($query);
        $query = $this->applySorting($query, $searchParams);

        return $query;
    }
}
