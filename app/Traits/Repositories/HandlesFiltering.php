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

        // TODO: Support nested search filters, e.g search[relation.column] = value
        // applyRelationSearchFilters?🗿
        return $query;
    }

    public function applyColumnFilters(Builder $query, array $searchParams, array $filterableColumns): Builder {
        if (isset($searchParams['column_filters'])) {
            foreach ($searchParams['column_filters'] as $key => $value) {
                if (!in_array($key, $filterableColumns)) {
                    continue;
                }
                if (is_array($value)) {
                    if (array_key_exists('from', $value) && array_key_exists('to', $value)) {
                        $query->whereBetween($key, [$value['from'], $value['to']]);
                    } elseif (array_key_exists('from', $value)) {
                        $query->where($key, '>=', $value['from']);
                    } elseif (array_key_exists('to', $value)) {
                        $query->where($key, '<=', $value['to']);
                    } elseif (is_numeric(key($value))) {
                        $query->whereIn($key, $value);
                    }
                } else {
                    $query->where($key, $value);
                }
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
                    $query->where(function ($query) use ($columns, $searchParams) {
                        foreach ($columns as $column) {
                            $query->orWhere($column, 'like', '%' . $searchParams['search'] . '%');
                        }
                    });
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
                    $query->whereHas($relation, function ($query) use ($key, $val) {
                        if (is_array($val)) {
                            if (array_key_exists('from', $val) && array_key_exists('to', $val)) {
                                $query->whereBetween($query->from . '.' . $key, [$val['from'], $val['to']]);
                            } elseif (array_key_exists('from', $val)) {
                                $query->where($query->from . '.' . $key, '>=', $val['from']);
                            } elseif (array_key_exists('to', $val)) {
                                $query->where($query->from . '.' . $key, '<=', $val['to']);
                            } elseif (is_numeric(key($val))) {
                                $query->whereIn($query->from . '.' . $key, $val);
                            }
                        } else {
                            $query->where($query->from . '.' . $key, $val);
                        }
                    });
                }
            }
        }

        return $query;
    }
}
