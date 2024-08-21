<?php

namespace App\Http\Controllers;

use App\Models\RawMaterial;
use Illuminate\Http\Request;
use App\Http\Resources\RawMaterialResource;
use App\Support\Interfaces\RawMaterialServiceInterface;
use App\Http\Requests\RawMaterial\StoreRawMaterialRequest;
use App\Http\Requests\RawMaterial\UpdateRawMaterialRequest;

class RawMaterialController extends Controller
{
    public function __construct(protected RawMaterialServiceInterface $rawMaterialService) {}
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        return RawMaterialResource::collection($this->rawMaterialService->getAll());
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRawMaterialRequest $request)
    {
        return new RawMaterialResource($this->rawMaterialService->create($request->validated()));
    }

    /**
     * Display the specified resource.
     */
    public function show(RawMaterial $rawMaterial)
    {
        return new RawMaterialResource($rawMaterial);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(RawMaterial $rawMaterial)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    // public function update( UpdateRawMaterialRequest $request, RawMaterial $rawMaterial)
    // {
    //     return new RawMaterialResource($this->rawMaterialService->update($rawMaterial, $request->validated()));
    // }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(RawMaterial $rawMaterial)
    {
        //
    }
}
