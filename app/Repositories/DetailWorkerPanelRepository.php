<?php

namespace App\Repositories;

use Adobrovolsky97\LaravelRepositoryServicePattern\Repositories\BaseRepository;
use App\Models\DetailWorkerPanel;
use App\Support\Interfaces\Repositories\DetailWorkerPanelRepositoryInterface;
use App\Traits\Repositories\HandlesFiltering;
use App\Traits\Repositories\HandlesRelations;
use App\Traits\Repositories\HandlesSorting;
use Illuminate\Database\Eloquent\Builder;

class DetailWorkerPanelRepository extends BaseRepository implements DetailWorkerPanelRepositoryInterface {
    use HandlesFiltering, HandlesRelations, HandlesSorting;

    protected function getModelClass(): string {
        return DetailWorkerPanel::class;
    }

    protected function applyFilters(array $searchParams = []): Builder {
        $query = $this->getQuery();

        $query = $this->applySearchFilters($query, $searchParams, ['work_status']);

        $query = $this->applyColumnFilters($query, $searchParams, ['id', 'serial_panel_id', 'work_status', 'worker_id', 'acceptance_status']);

        $query = $this->applyRelationColumnFilters($query, $searchParams, ['serial_panel' => ['panel_attachment_id', 'manufacture_status']]);

        $query = $this->applyResolvedRelations($query, $searchParams);

        $query = $this->applySorting($query, $searchParams);

        return $query;
    }
}