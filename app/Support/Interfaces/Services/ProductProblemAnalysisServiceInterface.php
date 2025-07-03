<?php

namespace App\Support\Interfaces\Services;

use Adobrovolsky97\LaravelRepositoryServicePattern\Services\Contracts\BaseCrudServiceInterface;
use App\Models\ProductProblemAnalysis;

interface ProductProblemAnalysisServiceInterface extends BaseCrudServiceInterface {
    public function getAnalysisDetails(ProductProblemAnalysis $productProblemAnalysis);
}
