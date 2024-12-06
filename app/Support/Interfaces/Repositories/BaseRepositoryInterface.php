<?php

namespace App\Support\Interfaces\Repositories;

use Adobrovolsky97\LaravelRepositoryServicePattern\Repositories\Contracts\BaseRepositoryInterface as AdobrovolRepositoryBaseInterface;
use Illuminate\Database\Eloquent\Builder;

interface BaseRepositoryInterface extends AdobrovolRepositoryBaseInterface {
    public function useFilters(array $searchParams): Builder;
}
