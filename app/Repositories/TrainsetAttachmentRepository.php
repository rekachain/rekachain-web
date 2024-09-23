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
        $query = $this->getQuery();

        $query = $this->applySearchFilters($query, $searchParams, ['name']);

        $query = $this->applyResolvedRelations($query, $searchParams);

        $query = $this->applySorting($query, $searchParams);

        return $query;
    }
}