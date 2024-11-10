<?php

namespace App\Repositories;

use Adobrovolsky97\LaravelRepositoryServicePattern\Repositories\BaseRepository;
use App\Models\TrainsetAttachment;
use App\Support\Interfaces\Repositories\TrainsetAttachmentRepositoryInterface;
use App\Traits\Repositories\HandlesFiltering;
use App\Traits\Repositories\HandlesRelations;
use App\Traits\Repositories\HandlesSorting;
use Illuminate\Database\Eloquent\Builder;

class TrainsetAttachmentRepository extends BaseRepository implements TrainsetAttachmentRepositoryInterface {
    use HandlesFiltering, HandlesRelations, HandlesSorting;

    protected function getModelClass(): string {
        return TrainsetAttachment::class;
    }

    protected function applyFilters(array $searchParams = []): Builder {
        $model = new ($this->getModelClass());

        $query = $this->getQuery();

        $query = $this->applySearchFilters($query, $searchParams, $model->getFilterable()['searchs']);

        $query = $this->applyColumnFilters($query, $searchParams, $model->getFilterable()['columns']);

        $query = $this->applyRelationColumnFilters($query, $searchParams, $model->getFilterable()['relation_columns']);

        $query = $this->applyResolvedRelations($query, $searchParams);

        $query = $this->applySorting($query, $searchParams);

        return $query;
    }

    public function useFilters(array $searchParams): Builder {
        return $this->applyFilters($searchParams);
    }
}
