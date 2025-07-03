<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProductProblemAnalysisResource;
use App\Models\ProductProblemAnalysis;
use App\Support\Interfaces\Services\ProductProblemAnalysisServiceInterface;
use Illuminate\Http\Request;

class ProductProblemAnalysisController extends Controller {
    public function __construct(protected ProductProblemAnalysisServiceInterface $productProblemAnalysisService) {}

    public function index(Request $request) {
        if ($this->ajax()) {
            $perPage = $request->get('perPage', 10);

            return ProductProblemAnalysisResource::collection($this->productProblemAnalysisService->getAllPaginated($request->query(), $perPage));
        }

        return inertia('Dashboard/ProductProblemAnalysis');
    }

    public function show(ProductProblemAnalysis $productProblemAnalysis) {
        if ($this->ajax()) {
            return $this->productProblemAnalysisService->getAnalysisDetails($productProblemAnalysis);
        }
    }
}
