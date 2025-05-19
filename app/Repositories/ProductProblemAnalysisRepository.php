<?php

namespace App\Repositories;

use App\Models\ProductProblemAnalysis;
use App\Support\Interfaces\Repositories\ProductProblemAnalysisRepositoryInterface;

class ProductProblemAnalysisRepository extends BaseRepository implements ProductProblemAnalysisRepositoryInterface {
    protected function getModelClass(): string {
        return ProductProblemAnalysis::class;
    }
}
