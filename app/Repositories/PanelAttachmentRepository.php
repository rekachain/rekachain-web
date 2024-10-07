<?php

namespace App\Repositories;

use Adobrovolsky97\LaravelRepositoryServicePattern\Repositories\BaseRepository;
use App\Models\PanelAttachment;
use App\Support\Interfaces\Repositories\PanelAttachmentRepositoryInterface;
use App\Traits\Repositories\HandlesFiltering;
use App\Traits\Repositories\HandlesRelations;
use App\Traits\Repositories\HandlesSorting;
use Illuminate\Database\Eloquent\Builder;

class PanelAttachmentRepository extends BaseRepository implements PanelAttachmentRepositoryInterface {
    use HandlesFiltering, HandlesRelations, HandlesSorting;

    protected function getModelClass(): string {
        return PanelAttachment::class;
    }

    protected function applyFilters(array $searchParams = []): Builder {
        $query = $this->getQuery();

        $query = $this->applySearchFilters($query, $searchParams, ['status']);

        $query = $this->applyColumnFilters($query, $searchParams, ['source_workstation_id','destination_workstation_id','status','panel_attachment_id','supervisor_id']);

        $query = $this->applyRelationColumnFilters($query, $searchParams, ['detail_worker_panels'=>['worker_id']]);
        
        $query = $this->applyResolvedRelations($query, $searchParams);

        $query = $this->applySorting($query, $searchParams);

        return $query;
    }
}
