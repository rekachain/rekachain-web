<?php

namespace App\Repositories;

use Adobrovolsky97\LaravelRepositoryServicePattern\Repositories\BaseRepository;
use App\Models\PanelAttachmentHandler;
use App\Support\Interfaces\Repositories\PanelAttachmentHandlerRepositoryInterface;
use App\Traits\Repositories\HandlesFiltering;
use App\Traits\Repositories\HandlesRelations;
use App\Traits\Repositories\HandlesSorting;
use Illuminate\Database\Eloquent\Builder;

class PanelAttachmentHandlerRepository extends BaseRepository implements PanelAttachmentHandlerRepositoryInterface {
    use HandlesFiltering, HandlesRelations, HandlesSorting;

    protected function getModelClass(): string {
        return PanelAttachmentHandler::class;
    }

    protected function applyFilters(array $searchParams = []): Builder {
        $query = $this->getQuery();

        $query = $this->applySearchFilters($query, $searchParams, ['handler_name', 'handles']);

        $query = $this->applyColumnFilters($query, $searchParams, ['panel_attachment_id', 'user_id', 'handles']);

        $query = $this->applyResolvedRelations($query, $searchParams);

        $query = $this->applySorting($query, $searchParams);

        return $query;
    }
}
