<?php

namespace App\Repositories;

use Adobrovolsky97\LaravelRepositoryServicePattern\Repositories\BaseRepository;
use App\Models\WorkDay;
use App\Support\Interfaces\Repositories\WorkDayRepositoryInterface;
use App\Traits\Repositories\HandlesRelations;
use App\Traits\Repositories\HandlesSorting;
use Illuminate\Database\Eloquent\Builder;

class WorkDayRepository extends BaseRepository implements WorkDayRepositoryInterface {
    use HandlesRelations, HandlesSorting;

    protected function getModelClass(): string {
        return WorkDay::class;
    }

    protected function applyFilters(array $searchParams = []): Builder {
        $query = $this->getQuery();

        $query = $this->applyResolvedRelations($query, $searchParams);

        $query = $this->applySorting($query, $searchParams);

        return $query;
    }
}
