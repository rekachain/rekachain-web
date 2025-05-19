<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProductProblemAnalysis\StoreProductProblemAnalysisRequest;
use App\Http\Requests\ProductProblemAnalysis\UpdateProductProblemAnalysisRequest;
use App\Http\Resources\ProductProblemAnalysisResource;
use App\Models\ProductProblemAnalysis;
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

        return inertia('ProductProblemAnalysis/Index');
    }

    public function create() {
        return inertia('ProductProblemAnalysis/Create');
    }

    public function store(StoreProductProblemAnalysisRequest $request) {
        if ($this->ajax()) {
            return $this->productProblemAnalysisService->create($request->validated());
        }
    }

    public function show(ProductProblemAnalysis $productProblemAnalysis) {
        $data = ProductProblemAnalysisResource::make($productProblemAnalysis);

        if ($this->ajax()) {
            return $data;
        }

        return inertia('ProductProblemAnalysis/Show', compact('data'));
    }

    public function edit(ProductProblemAnalysis $productProblemAnalysis) {
        $data = ProductProblemAnalysisResource::make($productProblemAnalysis);

        return inertia('ProductProblemAnalysis/Edit', compact('data'));
    }

    public function update(UpdateProductProblemAnalysisRequest $request, ProductProblemAnalysis $productProblemAnalysis) {
        if ($this->ajax()) {
            return $this->productProblemAnalysisService->update($productProblemAnalysis, $request->validated());
        }
    }

    public function destroy(ProductProblemAnalysis $productProblemAnalysis) {
        if ($this->ajax()) {
            return $this->productProblemAnalysisService->delete($productProblemAnalysis);
        }
    }
}