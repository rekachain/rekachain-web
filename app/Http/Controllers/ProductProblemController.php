<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProductProblem\StoreProductProblemRequest;
use App\Http\Requests\ProductProblem\UpdateProductProblemRequest;
use App\Http\Resources\ProductProblemResource;
use App\Models\ProductProblem;
use App\Support\Interfaces\Services\ProductProblemServiceInterface;
use Illuminate\Http\Request;

class ProductProblemController extends Controller {
    public function __construct(protected ProductProblemServiceInterface $productProblemService) {}

    public function index(Request $request) {
        $perPage = $request->get('perPage', 10);
        $data = ProductProblemResource::collection($this->productProblemService->with(['component'])->getAllPaginated($request->query(), $perPage));

        if ($this->ajax()) {
            return $data;
        }

        return inertia('ProductProblem/Index');
    }

    public function create() {
        return inertia('ProductProblem/Create');
    }

    public function store(StoreProductProblemRequest $request) {
        $productProblem = $this->productProblemService->create($request->validated());
        if ($this->ajax()) {
            return ProductProblemResource::make($productProblem->load(['component','returned_product']));
        }
    }

    public function show(ProductProblem $productProblem) {
        $data = ProductProblemResource::make($productProblem->load(['component','returned_product']));

        if ($this->ajax()) {
            return $data;
        }

        return inertia('ProductProblem/Show', compact('data'));
    }

    public function edit(ProductProblem $productProblem) {
        $data = ProductProblemResource::make($productProblem->load(['component','returned_product']));

        return inertia('ProductProblem/Edit', compact('data'));
    }

    public function update(UpdateProductProblemRequest $request, ProductProblem $productProblem) {
        $productProblem = $this->productProblemService->update($productProblem, $request->validated());
        if ($this->ajax()) {
            return ProductProblemResource::make($productProblem->load(['component','returned_product']));
        }
    }

    public function destroy(ProductProblem $productProblem) {
        if ($this->ajax()) {
            return $this->productProblemService->delete($productProblem);
        }
    }
}