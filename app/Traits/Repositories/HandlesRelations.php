<?php

namespace App\Traits\Repositories;

use Illuminate\Database\Eloquent\Builder;

trait HandlesRelations {
    /**
     * Automatically apply relations to the query based on request parameters.
     */
    protected function applyResolvedRelations(Builder $query, array $params = []): Builder {
        $relations = $params['relations'] ?? '';

        if ($relations) {
            // Split the relations string into individual relations
            $relationsArray = explode(',', $relations);

            // Apply each relation to the query
            foreach ($relationsArray as $relation) {
                $query->with($this->parseRelation($relation));
            }
        }

        return $query;
    }

    /**
     * Parse relation string to support nested relations.
     */
    protected function parseRelation(string $relation): array|string {
        $relationParts = explode('.', $relation);
        $nestedRelation = array_shift($relationParts);

        if (count($relationParts) > 0) {
            // Recurse to handle nested relations
            return [$nestedRelation => function ($query) use ($relationParts) {
                $query->with($this->parseRelation(implode('.', $relationParts)));
            }];
        }

        return $nestedRelation;
    }
}
