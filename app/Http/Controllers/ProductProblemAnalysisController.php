<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProductProblemAnalysisResource;
use App\Support\Interfaces\Services\ProductProblemAnalysisServiceInterface;
use Illuminate\Http\Request;

class ProductProblemAnalysisController extends Controller {
    public function __construct(protected ProductProblemAnalysisServiceInterface $productProblemAnalysisService) {}

    public function index(Request $request) {
        $perPage = $request->get('perPage', 10);
        $data = ProductProblemAnalysisResource::collection($this->productProblemAnalysisService->getAllPaginated($request->query(), $perPage));

        if ($this->ajax()) {
            return $data;
        }

        return inertia('Dashboard/ProductProblemAnalysis', compact('data'));
    }
}
