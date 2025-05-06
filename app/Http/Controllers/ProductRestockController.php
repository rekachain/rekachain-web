<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProductRestock\StoreProductRestockRequest;
use App\Http\Requests\ProductRestock\UpdateProductRestockRequest;
use App\Http\Resources\ProductRestockResource;
use App\Models\ProductRestock;
use App\Support\Enums\IntentEnum;
use App\Support\Interfaces\Services\ProductRestockServiceInterface;
use Illuminate\Http\Request;

class ProductRestockController extends Controller {
    public function __construct(protected ProductRestockServiceInterface $productRestockService) {}

    public function index(Request $request) {
        $perPage = $request->get('perPage', 10);

        if ($this->ajax()) {
            return ProductRestockResource::collection($this->productRestockService->with(['product_restockable', 'returned_product.buyer'])->getAllPaginated($request->query(), $perPage));
        }

        return inertia('ProductRestock/Index');
    }

    public function create() {
        return inertia('ProductRestock/Create');
    }

    public function store(StoreProductRestockRequest $request) {
        $intent = $request->get('intent');
        if ($this->ajax()) {
            switch ($intent) {
                case IntentEnum::WEB_PRODUCT_RESTOCK_INITIATE_PROJECT->value:
                    return $this->productRestockService->initiateRestockProject($request->validated());
            }
            $productRestock = $this->productRestockService->create($request->validated());

            return ProductRestockResource::make($productRestock->load(['product_restockable', 'returned_product.buyer', 'project']));
        }
    }

    public function show(ProductRestock $productRestock) {

        if ($this->ajax()) {
            $data = ProductRestockResource::make($productRestock->load(['product_restockable', 'returned_product.buyer', 'project']));

            return $data;
        }

        $data = ProductRestockResource::make($productRestock->load(['product_restockable', 'returned_product.buyer', 'project']));

        return inertia('ProductRestock/Show', compact('data'));
    }

    public function edit(ProductRestock $productRestock) {
        $data = ProductRestockResource::make($productRestock->load(['product_restockable', 'returned_product.buyer', 'project']));

        return inertia('ProductRestock/Edit', compact('data'));
    }

    public function update(UpdateProductRestockRequest $request, ProductRestock $productRestock) {
        if ($this->ajax()) {
            $productRestock = $this->productRestockService->update($productRestock, $request->validated());

            return ProductRestockResource::make($productRestock->load(['product_restockable', 'returned_product.buyer', 'project']));
        }
    }

    public function destroy(ProductRestock $productRestock) {
        if ($this->ajax()) {
            return $this->productRestockService->delete($productRestock);
        }
    }
}
