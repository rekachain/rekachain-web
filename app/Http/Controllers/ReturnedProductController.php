<?php

namespace App\Http\Controllers;

use App\Http\Requests\ReturnedProduct\StoreReturnedProductRequest;
use App\Http\Requests\ReturnedProduct\UpdateReturnedProductRequest;
use App\Http\Resources\ReturnedProductResource;
use App\Models\ReturnedProduct;
use App\Support\Interfaces\Services\ReturnedProductServiceInterface;
use Illuminate\Http\Request;

class ReturnedProductController extends Controller {
    public function __construct(protected ReturnedProductServiceInterface $returnedProductService) {}

    public function index(Request $request) {
        $perPage = $request->get('perPage', 10);
        $data = ReturnedProductResource::collection($this->returnedProductService->getAllPaginated($request->query(), $perPage));

        if ($this->ajax()) {
            return $data;
        }

        return inertia('ReturnedProduct/Index');
    }

    public function create() {
        return inertia('ReturnedProduct/Create');
    }

    public function store(StoreReturnedProductRequest $request) {
        if ($this->ajax()) {
            return $this->returnedProductService->create($request->validated());
        }
    }

    public function show(ReturnedProduct $returnedProduct) {
        $data = ReturnedProductResource::make($returnedProduct);

        if ($this->ajax()) {
            return $data;
        }

        return inertia('ReturnedProduct/Show', compact('data'));
    }

    public function edit(ReturnedProduct $returnedProduct) {
        $data = ReturnedProductResource::make($returnedProduct);

        return inertia('ReturnedProduct/Edit', compact('data'));
    }

    public function update(UpdateReturnedProductRequest $request, ReturnedProduct $returnedProduct) {
        if ($this->ajax()) {
            return $this->returnedProductService->update($returnedProduct, $request->validated());
        }
    }

    public function destroy(ReturnedProduct $returnedProduct) {
        if ($this->ajax()) {
            return $this->returnedProductService->delete($returnedProduct);
        }
    }
}