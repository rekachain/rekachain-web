<?php

namespace App\Traits\Models;

trait HasFilterable {
    public function getFilterableRelations(): array {
        return $this->filterable['relations'] ?? [];
    }

    public function getFilterable(): array {
        $filterable = [];

        // Get filterable columns for the current model
        $filterable['searchs'] = $this->getSearchFilterableColumns();
        $filterable['columns'] = $this->getColumnFilterableColumns();

        // Get filterable columns for related models
        $filterable['relation_searchs'] = [];
        $filterable['relation_columns'] = [];

        foreach ($this->getFilterableRelations() as $relationName) {
            $explodedRelation = explode('.', $relationName);
            $latestRelatedModel = $this;

            foreach ($explodedRelation as $relationPart) {
                $latestRelatedModel = $latestRelatedModel->$relationPart()->getRelated();
            }
            
            // Check if the latest related model has a getFilterable method
            if (method_exists($latestRelatedModel, 'getFilterable')) {
                $relatedFilterable = $latestRelatedModel->getFilterable();

                // Add related model's filterable columns to the current model's filterable columns
                $filterable['relation_searchs'][$relationName] = $relatedFilterable['searchs'] ?? [];
                $filterable['relation_columns'][$relationName] = $relatedFilterable['columns'] ?? [];
            }
        }

        return $filterable;
    }

    protected function getSearchFilterableColumns(): array {
        // Return the filterable search columns for the current model
        // This can be a hardcoded array or a dynamic method
        return $this->filterable['searchs'] ?? [];
    }

    protected function getColumnFilterableColumns(): array {
        // Return the filterable columns for the current model
        // This can be a hardcoded array or a dynamic method
        return $this->filterable['columns'] ?? [];
    }
}
