<?php

namespace App\Repositories;

use Adobrovolsky97\LaravelRepositoryServicePattern\Repositories\BaseRepository;
use App\Models\Carriage;
use App\Support\Interfaces\CarriageRepositoryInterface;
use Illuminate\Database\Eloquent\Builder;

class CarriageRepository extends BaseRepository implements CarriageRepositoryInterface {
    protected function getModelClass(): string {
        return Carriage::class;
    }

    protected function applyFilters(array $searchParams = []): Builder {
        $query = $this->getQuery();

        if (isset($searchParams['orderBy'])) {
            $query->orderBy($searchParams['orderBy'], $searchParams['sortBy'] ?? 'desc');
        }

        return $query;
    }
}
