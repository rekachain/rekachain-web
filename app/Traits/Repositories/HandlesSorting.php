<?php

namespace App\Traits\Repositories;

use Illuminate\Database\Eloquent\Builder;

trait HandlesSorting {
    /**
     * Apply sorting to the query based on the given parameters.
     */
    protected function applySorting(Builder $query, array $searchParams = []): Builder {
        if (isset($searchParams['orderBy'])) {
            $query->orderBy($searchParams['orderBy'], $searchParams['sortDirection'] ?? 'desc');
        }

        //        Draft: Multiple ordering case
        //        If the request contains an 'ordering' parameter, apply it.
        //
        //        if (isset($searchParams['ordering']) && is_array($searchParams['ordering'])) {
        //            foreach ($searchParams['ordering'] as $field => $direction) {
        //                $query->orderBy($field, $direction);
        //            }
        //        }

        return $query;
    }
}
