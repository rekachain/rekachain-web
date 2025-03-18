<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProductProblemNote\StoreProductProblemNoteRequest;
use App\Http\Requests\ProductProblemNote\UpdateProductProblemNoteRequest;
use App\Http\Resources\ProductProblemNoteResource;
use App\Models\ProductProblemNote;
use App\Support\Interfaces\Services\ProductProblemNoteServiceInterface;
use Illuminate\Http\Request;

class ProductProblemNoteController extends Controller {
    public function __construct(protected ProductProblemNoteServiceInterface $productProblemNoteService) {}

    public function index(Request $request) {
        $perPage = $request->get('perPage', 10);
        $data = ProductProblemNoteResource::collection($this->productProblemNoteService->getAllPaginated($request->query(), $perPage));

        if ($this->ajax()) {
            return $data;
        }

        return inertia('ProductProblemNote/Index');
    }

    public function create() {
        return inertia('ProductProblemNote/Create');
    }

    public function store(StoreProductProblemNoteRequest $request) {
        if ($this->ajax()) {
            return $this->productProblemNoteService->create($request->validated());
        }
    }

    public function show(ProductProblemNote $productProblemNote) {
        $data = ProductProblemNoteResource::make($productProblemNote);

        if ($this->ajax()) {
            return $data;
        }

        return inertia('ProductProblemNote/Show', compact('data'));
    }

    public function edit(ProductProblemNote $productProblemNote) {
        $data = ProductProblemNoteResource::make($productProblemNote);

        return inertia('ProductProblemNote/Edit', compact('data'));
    }

    public function update(UpdateProductProblemNoteRequest $request, ProductProblemNote $productProblemNote) {
        if ($this->ajax()) {
            return $this->productProblemNoteService->update($productProblemNote, $request->validated());
        }
    }

    public function destroy(ProductProblemNote $productProblemNote) {
        if ($this->ajax()) {
            return $this->productProblemNoteService->delete($productProblemNote);
        }
    }
}