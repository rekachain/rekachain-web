<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ReturnedProduct\StoreReturnedProductRequest;
use App\Http\Requests\ReturnedProduct\UpdateReturnedProductRequest;
use App\Http\Resources\ProductProblemResource;
use App\Http\Resources\ReturnedProductResource;
use App\Models\ReturnedProduct;
use App\Support\Enums\IntentEnum;
use App\Support\Enums\ReturnedProductStatusEnum;
use App\Support\Enums\RoleEnum;
use App\Support\Interfaces\Services\ProductProblemServiceInterface;
use App\Support\Interfaces\Services\ReturnedProductServiceInterface;
use Illuminate\Http\Request;

class ApiReturnedProductController extends Controller
{
    public function __construct(
        protected ReturnedProductServiceInterface $returnedProductService,
        protected ProductProblemServiceInterface $productProblemService
    ) {}
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $perPage = request()->get('perPage', 5);
        $request->query->add(['column_filters' => array_merge_recursive($request->query('column_filters', []), ['status' => ['not' => ReturnedProductStatusEnum::REQUESTED->value]])]);
        if (!checkRoles([RoleEnum::SUPERVISOR_AFTERSALES, RoleEnum::MANAGER_AFTERSALES], true)) {
            $request->query->add(['relation_column_filters' => array_merge_recursive($request->query('relation_column_filters', []), ['returned_product_notes' => ['user_id' => auth()->user()->id]])]);
        }

        return ReturnedProductResource::collection($this->returnedProductService->with(['product_returnable', 'buyer'])->getAllPaginated(request()->query(), $perPage));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreReturnedProductRequest $request)
    {
        $intent = $request->get('intent');
        if ($this->ajax()) {
            switch ($intent) {
                case IntentEnum::API_RETURNED_PRODUCT_ADD_RETURNED_PRODUCT_WITH_NOTE->value:
                    $returnedProduct = $this->returnedProductService->createWithReturnedProductNote($request->validated());
                    return ReturnedProductResource::make($returnedProduct->load(['product_returnable', 'buyer']));
                default:
                    $returnedProduct = $this->returnedProductService->create($request->validated());
                    return ReturnedProductResource::make($returnedProduct->load(['product_returnable', 'buyer']));
            }

        }
    }

    /**
     * Display the specified resource.
     */
    public function show(ReturnedProduct $returnedProduct, Request $request)
    {
        $intent = $request->get('intent');

        switch ($intent) {
            case IntentEnum::API_RETURNED_PRODUCT_GET_PRODUCT_PROBLEMS->value:
                $request->query->add(['column_filters' => array_merge_recursive($request->query('column_filters', []), ['returned_product_id' => $returnedProduct->id])]);
                return ProductProblemResource::collection($this->productProblemService->with(['component'])->getAllPaginated($request->query(), 5));
            default:
                return ReturnedProductResource::make($returnedProduct->load(['product_returnable', 'buyer', 'returned_product_notes']));
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateReturnedProductRequest $request, ReturnedProduct $returnedProduct)
    {
        $intent = $request->get('intent');

        switch ($intent) {
            case IntentEnum::API_RETURNED_PRODUCT_CREATE_PRODUCT_PROBLEM->value:
                $this->returnedProductService->addProductProblem($returnedProduct, $request->validated());
                $request->query->add(['column_filters' => array_merge_recursive($request->query('column_filters', []), ['returned_product_id' => $returnedProduct->id])]);
                return ProductProblemResource::collection($this->productProblemService->with(['component'])->getAllPaginated($request->query(), 5));
            default:
                $returnedProduct = $this->returnedProductService->update($returnedProduct, $request->validated());
                return ReturnedProductResource::make($returnedProduct->load(['product_returnable', 'buyer']));
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
