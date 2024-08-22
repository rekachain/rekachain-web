<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Panel\StorePanelMaterialRequest;
use App\Http\Requests\Panel\UpdatePanelMaterialRequest;
use App\Http\Resources\PanelMaterialResource;
use App\Models\PanelMaterial;
// use App\Support\Interfaces\PermissionEnum;
use App\Support\Interfaces\PanelMaterialServiceInterface;
use Illuminate\Http\Request;

class ApiPanelMaterialController extends Controller
{
    public function __construct(
        protected PanelMaterialServiceInterface $panelMaterialService
    ) {}
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $perPage = request()->get('perPage', 15);
        return PanelMaterialResource::collection(
            $this->panelMaterialService->getAllPaginated(request()->query(), $perPage)
        )->additional(['message' => 'Success']);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePanelMaterialRequest $request)
    {
        return $this->panelMaterialService->create($request->validated());
    }

    /**
     * Display the specified resource.
     */
    public function show(PanelMaterial $panelMaterial)
    {
        return new PanelMaterialResource($panelMaterial);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePanelMaterialRequest $request, PanelMaterial $panelMaterial)
    {
        return $this->panelMaterialService->update($panelMaterial, $request->validated());
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(PanelMaterial $panelMaterial)
    {
        //
    }
}
