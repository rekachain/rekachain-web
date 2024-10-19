<?php

namespace App\Repositories;

use Adobrovolsky97\LaravelRepositoryServicePattern\Repositories\BaseRepository;
use App\Models\DetailWorkerTrainset;
use App\Support\Interfaces\Repositories\DetailWorkerTrainsetRepositoryInterface;
use App\Traits\Repositories\HandlesFiltering;
use App\Traits\Repositories\HandlesRelations;
use App\Traits\Repositories\HandlesSorting;
use Illuminate\Database\Eloquent\Builder;

class DetailWorkerTrainsetRepository extends BaseRepository implements DetailWorkerTrainsetRepositoryInterface {
    use HandlesFiltering, HandlesRelations, HandlesSorting;

    protected function getModelClass(): string {
        return DetailWorkerTrainset::class;
    }

    protected function applyFilters(array $searchParams = []): Builder {
        $query = $this->getQuery();

        $query = $this->applySearchFilters($query, $searchParams, ['name']);

        $query = $this->applyColumnFilters($query, $searchParams, ['work_status','worker_id', 'acceptance_status']);

        $query = $this->applyRelationColumnFilters($query, $searchParams, [
            'trainset_attachment_component' => [
                'trainset_attachment_id','carriage_panel_component_id'
            ],
            'trainset_attachment_component.trainset_attachment' => [
                'trainset_id','type'
            ],
        ]);

        $query = $this->applyResolvedRelations($query, $searchParams);

        $query = $this->applySorting($query, $searchParams);

        return $query;
    }
}