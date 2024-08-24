<?php

namespace App\Repositories;

use Adobrovolsky97\LaravelRepositoryServicePattern\Repositories\BaseRepository;
use App\Models\Carriage;
use App\Support\Interfaces\Repositories\CarriageRepositoryInterface;
use App\Traits\Repositories\HandlesRelations;
use App\Traits\Repositories\HandlesSorting;
use Illuminate\Database\Eloquent\Builder;

class CarriageRepository extends BaseRepository implements CarriageRepositoryInterface {
    use HandlesRelations, HandlesSorting;

    protected function getModelClass(): string {
        return Carriage::class;
    }

    protected function applyFilters(array $searchParams = []): Builder {

        $query = $this->getQuery();
        if (isset($searchParams['type'])) {
            $query->where('type', 'like', '%' . $searchParams['type'] . '%');
        }
        $query = $this->applyResolvedRelations($query, $searchParams);

        $query = $this->applySorting($query, $searchParams);

        return $query;
    }
}
