<?php

namespace App\Http\Controllers;

use App\Http\Requests\ReturnedProduct\StoreReturnedProductRequest;
use App\Http\Requests\ReturnedProduct\UpdateReturnedProductRequest;
use App\Http\Resources\ReturnedProductResource;
use App\Models\ReturnedProduct;
use App\Support\Enums\IntentEnum;
use App\Support\Enums\PermissionEnum;
use App\Support\Enums\ReturnedProductStatusEnum;
use App\Support\Interfaces\Services\ReturnedProductServiceInterface;
use Illuminate\Http\Request;

class ReturnedProductController extends Controller {
    public function __construct(protected ReturnedProductServiceInterface $returnedProductService) {}

    public function index(Request $request) {
        $perPage = $request->get('perPage', 10);
        $request->query->add(['column_filters' => array_merge_recursive($request->query('column_filters', []), ['status' => ['not' => ReturnedProductStatusEnum::REQUESTED->value]])]);
        if ($this->ajax()) {
            return ReturnedProductResource::collection($this->returnedProductService->with(['product_returnable', 'buyer'])->getAllPaginated($request->query(), $perPage));
        }

        return inertia('ReturnedProduct/Index');
    }

    public function requested_returns(Request $request) {
        $perPage = $request->get('perPage', 10);
        if (!checkPermissions(PermissionEnum::RETURNED_PRODUCT_READ, true)) {
            $request->query->add(['column_filters' => ['buyer_id' => auth()->id()]]);
        }
        $request->query->add(['column_filters' => array_merge_recursive($request->query('column_filters', []), ['status' => [ReturnedProductStatusEnum::REQUESTED->value]])]);
        if ($this->ajax()) {
            return ReturnedProductResource::collection($this->returnedProductService->getAllPaginated($request->query(), $perPage));
        }

        return inertia('ReturnedProduct/RequestedReturn/Index');
    }

    public function create() {
        return inertia('ReturnedProduct/Create');
    }

    public function store(StoreReturnedProductRequest $request) {
        $intent = $request->get('intent');
        if ($this->ajax()) {
            switch ($intent) {
                case IntentEnum::WEB_RETURNED_PRODUCT_IMPORT_RETURNED_PRODUCT_AND_PRODUCT_PROBLEM->value:
                    return $this->returnedProductService->importData($request->file('import_file'));
                case IntentEnum::WEB_RETURNED_PRODUCT_ADD_RETURNED_PRODUCT_WITH_NOTE->value:
                    return $this->returnedProductService->createWithReturnedProductNote($request->validated());
            }
            $returnedProduct = $this->returnedProductService->create($request->validated());

            return ReturnedProductResource::make($returnedProduct->load(['product_returnable', 'buyer']));
        }
    }

    public function show(ReturnedProduct $returnedProduct) {
        $data = ReturnedProductResource::make($returnedProduct->load(['product_returnable', 'buyer', 'product_problems.component', 'returned_product_notes.user']));

        if ($this->ajax()) {
            return $data;
        }

        return inertia('ReturnedProduct/Show', compact('data'));
    }

    public function edit(ReturnedProduct $returnedProduct) {
        $returnedProduct = ReturnedProductResource::make($returnedProduct->load(['product_returnable', 'buyer']));

        return inertia('ReturnedProduct/Edit', compact('returnedProduct'));
    }

    public function update(UpdateReturnedProductRequest $request, ReturnedProduct $returnedProduct) {
        $intent = $request->get('intent');
        if ($this->ajax()) {
            switch ($intent) {
                case IntentEnum::WEB_RETURNED_PRODUCT_ADD_PRODUCT_PROBLEM->value:
                    return $this->returnedProductService->addProductProblem($returnedProduct, $request->validated());
                case IntentEnum::WEB_RETURNED_PRODUCT_IMPORT_PRODUCT_PROBLEM->value:
                    return $this->returnedProductService->importProductProblemData($returnedProduct, $request->file('import_file'));
            }
            $returnedProduct = $this->returnedProductService->update($returnedProduct, $request->validated());

            return ReturnedProductResource::make($returnedProduct->load(['product_returnable', 'buyer']));
        }
    }

    public function destroy(ReturnedProduct $returnedProduct) {
        if ($this->ajax()) {
            return $this->returnedProductService->delete($returnedProduct);
        }
    }
}
