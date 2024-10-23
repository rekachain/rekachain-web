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

    public function applyColumnFilters(Builder $query, array $searchParams, array $filterableColumns): Builder {
        if (isset($searchParams['column_filters'])) {
            foreach ($searchParams['column_filters'] as $key => $value) {
                if (!in_array($key, $filterableColumns)) {
                    continue;
                }
                $query->where($key, $value);
            }
        }

        return $query;
    }

    /**
     * Apply filters to the query based on search parameters for related models.
     */
    public function applyRelationSearchFilters(Builder $query, array $searchParams, array $relationFilterableColumns): Builder {
        if (isset($searchParams['search'])) {
            foreach ($relationFilterableColumns as $relation => $columns) {
                $query->orWhereHas($relation, function ($query) use ($searchParams, $columns) {
                    foreach ($columns as $column) {
                        $query->where($column, 'like', '%' . $searchParams['search'] . '%');
                    }
                });
            }
        }

        return $query;
    }

    public function applyRelationColumnFilters(Builder $query, array $searchParams, array $relationFilterableColumns): Builder {
        if (isset($searchParams['relation_column_filters'])) {
            foreach ($searchParams['relation_column_filters'] as $relation => $value) {
                if (!array_key_exists($relation, $relationFilterableColumns)) {
                    continue;
                }
                foreach ($value as $key => $val) {
                    if (!in_array($key, $relationFilterableColumns[$relation])) {
                        continue;
                    }
                    $relationArray = explode('.', $relation);
                    $relationQuery = $query;
                    foreach ($relationArray as $index => $rel) {
                        if ($index === count($relationArray) - 1) {
                            $relationQuery = $relationQuery->whereHas($rel, function ($query) use ($key, $val) {
                                $query->where($key, $val);
                            });
                        } else {
                            $relationQuery = $relationQuery->whereHas($rel);
                        }
                    }
                }
            }
        }

        return $query;
    }
}
