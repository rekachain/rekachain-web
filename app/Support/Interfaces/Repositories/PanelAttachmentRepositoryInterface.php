<?php

namespace App\Support\Interfaces\Repositories;

use Adobrovolsky97\LaravelRepositoryServicePattern\Repositories\Contracts\BaseRepositoryInterface;
use Illuminate\Database\Eloquent\Builder;

interface PanelAttachmentRepositoryInterface extends BaseRepositoryInterface {
    public function useFilters(array $searchParams): Builder;
}
