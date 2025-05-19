<?php

namespace App\Services;

use App\Support\Interfaces\Repositories\ProductProblemAnalysisRepositoryInterface;
use App\Support\Interfaces\Services\ProductProblemAnalysisServiceInterface;

class ProductProblemAnalysisService extends BaseCrudService implements ProductProblemAnalysisServiceInterface {
    protected function getRepositoryClass(): string {
        return ProductProblemAnalysisRepositoryInterface::class;
    }
}