<?php

namespace App\Http\Controllers;

use App\Http\Requests\RawMaterial\StoreRawMaterialRequest;
use App\Http\Requests\RawMaterial\UpdateRawMaterialRequest;
use App\Http\Resources\RawMaterialResource;
use App\Models\RawMaterial;
use App\Support\Enums\PermissionEnum;
use App\Support\Interfaces\Services\RawMaterialServiceInterface;
use Illuminate\Http\Request;

class RawMaterialController extends Controller {
    public function __construct(protected RawMaterialServiceInterface $rawMaterialService) {}

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request) {

        $request->checkPermissionEnum(PermissionEnum::RAW_MATERIAL_READ);

        if ($this->ajax()) {
            $perPage = request()->get('perPage', 'All');

            if ($perPage !== 'All') {
                return RawMaterialResource::collection($this->rawMaterialService->getAllPaginated($request->query(), $perPage));
            }

            return RawMaterialResource::collection($this->rawMaterialService->getAll());
        }

        return inertia('RawMaterial/Index');

    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request) {
        $request->checkPermissionEnum(PermissionEnum::RAW_MATERIAL_CREATE);

        return inertia('RawMaterial/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRawMaterialRequest $request) {

        $request->checkPermissionEnum(PermissionEnum::RAW_MATERIAL_CREATE);

        return new RawMaterialResource($this->rawMaterialService->create($request->validated()));
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, RawMaterial $rawMaterial) {

        $request->checkPermissionEnum(PermissionEnum::RAW_MATERIAL_READ);

        if ($this->ajax()) {
            return new RawMaterialResource($rawMaterial);
        }

        //        return inertia('RawMaterial/Show', compact('rawMaterial'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Request $request, RawMaterial $rawMaterial) {

        $request->checkPermissionEnum(PermissionEnum::RAW_MATERIAL_UPDATE);

        return inertia('RawMaterial/Edit', compact('rawMaterial'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRawMaterialRequest $request, RawMaterial $rawMaterial) {

        $request->checkPermissionEnum(PermissionEnum::RAW_MATERIAL_UPDATE);

        return new RawMaterialResource($this->rawMaterialService->update($rawMaterial, $request->validated()));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, RawMaterial $rawMaterial) {
        $request->checkPermissionEnum(PermissionEnum::RAW_MATERIAL_DELETE);

        $this->rawMaterialService->delete($rawMaterial);

        return response()->noContent();
    }
}
