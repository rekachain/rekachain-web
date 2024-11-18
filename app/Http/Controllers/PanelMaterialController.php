<?php

namespace App\Http\Controllers;

use App\Http\Requests\PanelMaterial\StorePanelMaterialRequest;
use App\Http\Requests\PanelMaterial\UpdatePanelMaterialRequest;
use App\Http\Resources\PanelMaterialResource;
use App\Models\PanelMaterial;
use App\Support\Interfaces\Services\PanelMaterialServiceInterface;
use Illuminate\Http\Request;

class PanelMaterialController extends Controller {
    public function __construct(protected PanelMaterialServiceInterface $panelMaterialService) {}

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request) {
        $perPage = $request->get('perPage', '10');
        $data = PanelMaterialResource::collection($this->panelMaterialService->getAllPaginated($request->query(), $perPage));

        if ($this->ajax()) {
            return $data;
        }

        return inertia('PanelMaterial/Index');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create() {
        return inertia('PanelMaterial/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePanelMaterialRequest $request) {
        if ($this->ajax()) {
            return $this->panelMaterialService->create($request->validated());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(PanelMaterial $panelMaterial) {
        $data = PanelMaterialResource::make($panelMaterial);

        if ($this->ajax()) {
            return $data;
        }

        return inertia('PanelMaterial/Show', compact('data'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(PanelMaterial $panelMaterial) {
        $data = PanelMaterialResource::make($panelMaterial);

        return inertia('PanelMaterial/Edit', compact('data'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePanelMaterialRequest $request, PanelMaterial $panelMaterial) {
        if ($this->ajax()) {
            return $this->panelMaterialService->update($panelMaterial, $request->validated());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(PanelMaterial $panelMaterial) {
        if ($this->ajax()) {
            return $this->panelMaterialService->delete($panelMaterial);
        }
    }
}
