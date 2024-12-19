<?php

namespace App\Traits\Models;

/**
 * To use this in a model, define a $filterable property with at least 'searchs' and 'columns' values.
 * $filerable = [
 *     'searchs' => [],
 *     'columns' => [],
 * ]
 *
 * Add property 'relations' values to use search and column filter on related models.
 * $filerable = [
 *     'searchs' => [],
 *     'columns' => [],
 *     'relations' => ['relation'],
 * ]
 *
 * You can also define 'relation_searchs' and 'relation_columns' values to decide which columns
 * to filter on related models.
 * $filerable = [
 *     'searchs' => [],
 *     'columns' => [],
 *     'relations' => ['relation'],
 *     'relation_searchs' => [
 *         'relation' => [
 *             'column',
 *         ],
 *     ],
 *     'relation_columns' => [
 *         'relation' => [
 *             'column',
 *         ],
 *     ],
 * ]
 */
trait HasFilterable {
    /**
     * Returns an array of filterable columns and relations for the current model.
     *
     * The array contains the following structure:
     * [
     *     'searchs' => [],
     *     'columns' => [],
     *     'relation_searchs' => [
     *         'relation' => [
     *             'column',
     *         ],
     *     ],
     *     'relation_columns' => [
     *         'relation' => [
     *             'column',
     *         ],
     *     ],
     * ]
     */
    public function getFilterable(): array {
        $filterable = [];

        // Get filterable columns for the current model
        $filterable['searchs'] = $this->getSearchFilterableColumns();
        $filterable['columns'] = $this->getColumnFilterableColumns();

        // Get filterable columns for related models
        $filterable['relation_searchs'] = $filterableRelatedSearchs = $this->getRelatedSearchFilterableColumns();
        $filterable['relation_columns'] = $filterableRelatedColumns = $this->getRelatedColumnFilterableColumns();

        foreach ($this->getFilterableRelations() as $relationName) {
            // Get the latest related model
            $explodedRelation = explode('.', $relationName);
            $latestRelatedModel = $this;

            foreach ($explodedRelation as $relationPart) {
                $latestRelatedModel = $latestRelatedModel->$relationPart()->getRelated();
            }

            // Check if the latest related model has a implemented this trait
            if (method_exists($latestRelatedModel, 'getFilterable')) {
                $relatedFilterable = $latestRelatedModel->getFilterable();

                // Add related model's filterable columns to the current model's filterable columns
                if (!array_key_exists($relationName, array: $filterableRelatedSearchs)) {
                    $filterable['relation_searchs'][$relationName] = $relatedFilterable['searchs'] ?? [];
                }

                if (!array_key_exists($relationName, $filterableRelatedColumns)) {
                    $filterable['relation_columns'][$relationName] = $relatedFilterable['columns'] ?? [];
                }
            }
        }

        return $filterable;
    }

    protected function getSearchFilterableColumns(): array {
        // Return the filterable search columns for the current model
        return $this->filterable['searchs'] ?? [];
    }

    protected function getColumnFilterableColumns(): array {
        // Return the filterable columns for the current model
        return $this->filterable['columns'] ?? [];
    }

    protected function getFilterableRelations(): array {
        // Return the filterable relations for the current model
        return $this->filterable['relations'] ?? [];
    }

    protected function getRelatedSearchFilterableColumns(): array {
        // Return the related filterable search columns for the current model
        return $this->filterable['relation_searchs'] ?? [];
    }

    protected function getRelatedColumnFilterableColumns(): array {
        // Return the related filterable columns for the current model
        return $this->filterable['relation_columns'] ?? [];
    }
}
