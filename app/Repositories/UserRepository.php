<?php

namespace App\Repositories;

use Adobrovolsky97\LaravelRepositoryServicePattern\Repositories\BaseRepository;
use App\Models\User;
use App\Support\Interfaces\UserRepositoryInterface;
use App\Traits\Repositories\HandlesRelations;
use Illuminate\Database\Eloquent\Builder;

class UserRepository extends BaseRepository implements UserRepositoryInterface {
    use HandlesRelations;

    protected function getModelClass(): string {
        return User::class;
    }

    protected function applyFilters(array $searchParams = []): Builder {
        $query = parent::getQuery($searchParams);

        return $this->applyResolvedRelations($query, $searchParams);
    }
}
