<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ProductProblem\UpdateProductProblemRequest;
use App\Http\Resources\ProductProblemResource;
use App\Models\ProductProblem;
use App\Support\Enums\IntentEnum;
use App\Support\Interfaces\Services\ProductProblemServiceInterface;
use Illuminate\Http\Request;

class ApiProductProblemController extends Controller
{
    public function __construct(
        protected ProductProblemServiceInterface $productProblemService
    ) {}
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(ProductProblem $productProblem)
    {
        return ProductProblemResource::make($productProblem->load(['component', 'product_problem_notes']));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProductProblemRequest $request, ProductProblem $productProblem)
    {
        $intent = $request->get('intent');
        switch ($intent) {
            case IntentEnum::API_PRODUCT_PROBLEM_UPDATE_PRODUCT_PROBLEM_WITH_NOTE->value:
                $productProblem = $this->productProblemService->updateWithNote($productProblem, $request->validated());
                return ProductProblemResource::make($productProblem->load(['component', 'product_problem_notes']));
            default:
                $productProblem = $this->productProblemService->update($productProblem, $request->validated());
                return ProductProblemResource::make($productProblem->load(['component', 'product_problem_notes']));
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
