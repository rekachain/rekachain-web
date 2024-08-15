<?php

namespace App\Traits\Repositories;

use Illuminate\Database\Eloquent\Builder;

trait HandlesRelations {
    /**
     * Automatically apply relations to the query based on request parameters.
     *
     * @param \\Illuminate\\Database\\Eloquent\\Builder $query
     * @return \\Illuminate\\Database\\Eloquent\\Builder
     */
    protected function applyResolvedRelations($query, array $params = []): Builder {
        $relations = $params['relations'] ?? '';

        if ($relations) {
            $query->with(explode(',', $relations));
        }

        return $query;
    }
}
