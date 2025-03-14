<?php

namespace App\Repositories;

use App\Models\ProductProblem;
use App\Support\Interfaces\Repositories\ProductProblemRepositoryInterface;

class ProductProblemRepository extends BaseRepository implements ProductProblemRepositoryInterface {
    protected function getModelClass(): string {
        return ProductProblem::class;
    }
}
