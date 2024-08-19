<?php

namespace App\Repositories;

use Adobrovolsky97\LaravelRepositoryServicePattern\Repositories\BaseRepository;
use App\Models\Project;
use App\Support\Interfaces\ProjectRepositoryInterface;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

class ProjectRepository extends BaseRepository implements ProjectRepositoryInterface {
    protected function getModelClass(): string {
        return Project::class;
    }

    protected function applyFilters(array $searchParams = []): Builder {
        $query = $this->getQuery();

        if (isset($searchParams['orderBy'])) {
            $query->orderBy($searchParams['orderBy'], $searchParams['sortBy'] ?? 'desc');
        }

        return $query;
    }
}
