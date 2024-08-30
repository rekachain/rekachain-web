<?php

namespace App\Repositories;

use Adobrovolsky97\LaravelRepositoryServicePattern\Repositories\BaseRepository;
use App\Models\WorkDayTime;
use App\Support\Interfaces\Repositories\WorkDayTimeRepositoryInterface;
use App\Traits\Repositories\HandlesRelations;
use App\Traits\Repositories\HandlesSorting;
use Illuminate\Database\Eloquent\Builder;

class WorkDayTimeRepository extends BaseRepository implements WorkDayTimeRepositoryInterface {
    use HandlesRelations, HandlesSorting;

    protected function getModelClass(): string {
        return WorkDayTime::class;
    }

    protected function applyFilters(array $searchParams = []): Builder {
        $query = $this->getQuery();

        $query = $this->applyResolvedRelations($query, $searchParams);

        $query = $this->applySorting($query, $searchParams);

        return $query;
    }
}
