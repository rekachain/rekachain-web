<?php

namespace App\Traits\Repositories;

use Illuminate\Database\Eloquent\Builder;

trait HandlesFiltering {
    /**
     * Apply filters to the query based on search parameter.
     */
    public function applySearchFilters(Builder $query, array $searchParams, array $filterableColumns): Builder {
        if (isset($searchParams['search'])) {
            foreach ($filterableColumns as $column) {
                $query->orWhere($column, 'like', '%' . $searchParams['search'] . '%');
            }
        }

        return $query;
    }
}
