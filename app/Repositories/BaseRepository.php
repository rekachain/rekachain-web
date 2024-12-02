<?php

namespace App\Repositories;

use Adobrovolsky97\LaravelRepositoryServicePattern\Repositories\BaseRepository as AdobrovolskyBaseRepository;
use App\Traits\Repositories\HandlesFiltering;
use App\Traits\Repositories\HandlesRelations;
use App\Traits\Repositories\HandlesSorting;
use Illuminate\Database\Eloquent\Builder;

abstract class BaseRepository extends AdobrovolskyBaseRepository {
    use HandlesFiltering, HandlesRelations, HandlesSorting;

    protected function applyFilters(array $searchParams = []): Builder {
        $model = new ($this->getModelClass());

        $query = $this->getQuery();

        $filterable = method_exists($model, 'getFilterable') ? $model->getFilterable() : [];

        $query->where(function ($query) use ($searchParams, $filterable) {
            $query = $this->applySearchFilters($query, $searchParams, $filterable['searchs'] ?? []);

            $query = $this->applyRelationSearchFilters($query, $searchParams, $filterable['relation_searchs'] ?? []);
        });

        $query = $this->applyColumnFilters($query, $searchParams, $filterable['columns'] ?? []);

        $query = $this->applyRelationColumnFilters($query, $searchParams, $filterable['relation_columns'] ?? []);

        $query = $this->applyResolvedRelations($query, $searchParams);

        $query = $this->applySorting($query, $searchParams);

        return $query;
    }

    public function useFilters(array $searchParams): Builder {
        return $this->applyFilters($searchParams);
    }
}
