<?php

namespace App\Repositories;

use Adobrovolsky97\LaravelRepositoryServicePattern\Repositories\BaseRepository;
use App\Models\PresetTrainset;
use App\Support\Interfaces\Repositories\PresetTrainsetRepositoryInterface;
use App\Traits\Repositories\HandlesFiltering;
use App\Traits\Repositories\HandlesRelations;
use App\Traits\Repositories\HandlesSorting;
use Illuminate\Database\Eloquent\Builder;

class PresetTrainsetRepository extends BaseRepository implements PresetTrainsetRepositoryInterface {
    use HandlesFiltering, HandlesRelations, HandlesSorting;

    public function delete($keyOrModel): bool {
        // check if preset trainset has any associated trainsets, if so, just return false, otherwise delete the preset trainset and its carriage presets
        $model = $keyOrModel;
        if ($model->trainsets()->exists()) {
            return false;
        }

        $model->carriage_presets()->delete();

        return $model->delete();
    }

    protected function getModelClass(): string {
        return PresetTrainset::class;
    }

    protected function applyFilters(array $searchParams = []): Builder {
        $query = $this->getQuery();

        $query = $this->applySearchFilters($query, $searchParams, ['name']);

        $query = $this->applyResolvedRelations($query, $searchParams);

        $query = $this->applySorting($query, $searchParams);

        return $query;
    }
}
