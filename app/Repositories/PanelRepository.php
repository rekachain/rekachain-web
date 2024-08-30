<?php

namespace App\Repositories;

use Adobrovolsky97\LaravelRepositoryServicePattern\Repositories\BaseRepository;
use App\Models\Panel;
use App\Support\Interfaces\Repositories\PanelRepositoryInterface;
use App\Traits\Repositories\HandlesRelations;
use App\Traits\Repositories\HandlesSorting;
use Illuminate\Database\Eloquent\Builder;

class PanelRepository extends BaseRepository implements PanelRepositoryInterface {
    use HandlesRelations, HandlesSorting;

    protected function getModelClass(): string {
        return Panel::class;
    }

    protected function applyFilters(array $searchParams = []): Builder {
        $query = $this->getQuery();

        if (isset($searchParams['name'])) {
            $query->where('name', 'like', '%' . $searchParams['name'] . '%');
        }

        $query = $this->applyResolvedRelations($query, $searchParams);

        $query = $this->applySorting($query, $searchParams);

        return $query;
    }
}
