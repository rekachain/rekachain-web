<?php

namespace App\Http\Controllers;

use App\Http\Requests\ComponentMaterial\StoreComponentMaterialRequest;
use App\Http\Requests\ComponentMaterial\UpdateComponentMaterialRequest;
use App\Http\Resources\ComponentMaterialResource;
use App\Models\ComponentMaterial;
use App\Support\Interfaces\Services\ComponentMaterialServiceInterface;
use Illuminate\Http\Request;
use Psr\Container\ContainerExceptionInterface;
use Psr\Container\NotFoundExceptionInterface;

class ComponentMaterialController extends Controller {

    public function  __construct(protected ComponentMaterialServiceInterface $componentMaterialService) {}

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request) {
        $perPage = $request->get('perPage', '10');
        $data = ComponentMaterialResource::collection($this->componentMaterialService->getAllPaginated($request->query(), $perPage));

        if ($this->ajax()) {
            return $data;
        }

        return inertia('ComponentMaterial/Index');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create() {
        return inertia('ComponentMaterial/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreComponentMaterialRequest $request) {
        if ($this->ajax()) {
            return $this->componentMaterialService->create($request->validated());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(ComponentMaterial $componentMaterial) {
        $data = ComponentMaterialResource::make($componentMaterial);

        if ($this->ajax()) {
            return $data;
        }

        return inertia('ComponentMaterial/Show', compact('data'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ComponentMaterial $componentMaterial) {
        $data = ComponentMaterialResource::make($componentMaterial);

        return inertia('ComponentMaterial/Edit', compact('data'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateComponentMaterialRequest $request, ComponentMaterial $componentMaterial) {
        if ($this->ajax()) {
            return $this->componentMaterialService->update($componentMaterial, $request->validated());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ComponentMaterial $componentMaterial) {
        if ($this->ajax()) {
            return $this->componentMaterialService->delete($componentMaterial);
        }
    }
}
