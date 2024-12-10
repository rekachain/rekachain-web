<?php

namespace App\Http\Controllers;

use App\Helpers\PermissionHelper;
use App\Http\Requests\RawMaterial\StoreRawMaterialRequest;
use App\Http\Requests\RawMaterial\UpdateRawMaterialRequest;
use App\Http\Resources\RawMaterialResource;
use App\Models\RawMaterial;
use App\Support\Enums\IntentEnum;
use App\Support\Enums\PermissionEnum;
use App\Support\Interfaces\Services\RawMaterialServiceInterface;
use Illuminate\Http\Request;
use Psr\Container\ContainerExceptionInterface;
use Psr\Container\NotFoundExceptionInterface;

class RawMaterialController extends Controller {
    public function __construct(protected RawMaterialServiceInterface $rawMaterialService) {}

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request) {
        PermissionHelper::check(PermissionEnum::RAW_MATERIAL_READ);

        if ($this->ajax()) {

            $intent = $request->get('intent');

            switch ($intent) {
                case IntentEnum::WEB_RAW_MATERIAL_GET_TEMPLATE_IMPORT_RAW_MATERIAL->value:
                    PermissionHelper::check(PermissionEnum::RAW_MATERIAL_IMPORT);

                    return $this->rawMaterialService->getImportDataTemplate();
            }

            try {
                // TODO: might remove the default value of perPage
                $perPage = request()->get('perPage', 'All');
                if ($perPage !== 'All') {
                    return RawMaterialResource::collection($this->rawMaterialService->getAllPaginated($request->query(), $perPage));
                }

                return RawMaterialResource::collection($this->rawMaterialService->getAll());
            } catch (NotFoundExceptionInterface|ContainerExceptionInterface $e) {
            }

        }

        return inertia('RawMaterial/Index');

    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request) {
        PermissionHelper::check(PermissionEnum::RAW_MATERIAL_CREATE);

        return inertia('RawMaterial/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRawMaterialRequest $request) {

        PermissionHelper::check(PermissionEnum::RAW_MATERIAL_CREATE);

        $intent = $request->get('intent');

        switch ($intent) {
            case IntentEnum::WEB_RAW_MATERIAL_IMPORT_RAW_MATERIAL->value:
                PermissionHelper::check(PermissionEnum::RAW_MATERIAL_IMPORT);
                $this->rawMaterialService->importData($request->file('import_file'));

                return response()->noContent();
        }

        return new RawMaterialResource($this->rawMaterialService->create($request->validated()));
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, RawMaterial $rawMaterial) {

        PermissionHelper::check(PermissionEnum::RAW_MATERIAL_READ);

        if ($this->ajax()) {
            return new RawMaterialResource($rawMaterial);
        }

        //        return inertia('RawMaterial/Show', compact('rawMaterial'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Request $request, RawMaterial $rawMaterial) {

        PermissionHelper::check(PermissionEnum::RAW_MATERIAL_UPDATE);

        return inertia('RawMaterial/Edit', compact('rawMaterial'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRawMaterialRequest $request, RawMaterial $rawMaterial) {

        PermissionHelper::check(PermissionEnum::RAW_MATERIAL_UPDATE);

        return new RawMaterialResource($this->rawMaterialService->update($rawMaterial, $request->validated()));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, RawMaterial $rawMaterial) {
        PermissionHelper::check(PermissionEnum::RAW_MATERIAL_DELETE);

        $this->rawMaterialService->delete($rawMaterial);

        return response()->noContent();
    }
}
