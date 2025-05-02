<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProductProblemResource;
use App\Models\ProductProblem;
use Illuminate\Http\Request;

class ApiProductProblemController extends Controller
{
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
    public function update(Request $request, ProductProblem $productProblem)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
