<?php

namespace App\Http\Controllers;

use App\Http\Requests\CustomAttachmentMaterial\StoreCustomAttachmentMaterialRequest;
use App\Http\Requests\CustomAttachmentMaterial\UpdateCustomAttachmentMaterialRequest;
use App\Http\Resources\CustomAttachmentMaterialResource;
use App\Models\CustomAttachmentMaterial;
use App\Support\Interfaces\Services\CustomAttachmentMaterialServiceInterface;
use Illuminate\Http\Request;

class CustomAttachmentMaterialController extends Controller {
    public function __construct(protected CustomAttachmentMaterialServiceInterface $customAttachmentMaterialService) {}

    public function index(Request $request) {
        $perPage = $request->get('perPage', 10);
        $data = CustomAttachmentMaterialResource::collection($this->customAttachmentMaterialService->getAllPaginated($request->query(), $perPage));

        if ($this->ajax()) {
            return $data;
        }

        return inertia('CustomAttachmentMaterial/Index');
    }

    public function create() {
        return inertia('CustomAttachmentMaterial/Create');
    }

    public function store(StoreCustomAttachmentMaterialRequest $request) {
        if ($this->ajax()) {
            return $this->customAttachmentMaterialService->create($request->validated());
        }
    }

    public function show(CustomAttachmentMaterial $customAttachmentMaterial) {
        $data = CustomAttachmentMaterialResource::make($customAttachmentMaterial);

        if ($this->ajax()) {
            return $data;
        }

        return inertia('CustomAttachmentMaterial/Show', compact('data'));
    }

    public function edit(CustomAttachmentMaterial $customAttachmentMaterial) {
        $data = CustomAttachmentMaterialResource::make($customAttachmentMaterial);

        return inertia('CustomAttachmentMaterial/Edit', compact('data'));
    }

    public function update(UpdateCustomAttachmentMaterialRequest $request, CustomAttachmentMaterial $customAttachmentMaterial) {
        if ($this->ajax()) {
            return $this->customAttachmentMaterialService->update($customAttachmentMaterial, $request->validated());
        }
    }

    public function destroy(CustomAttachmentMaterial $customAttachmentMaterial) {
        if ($this->ajax()) {
            return $this->customAttachmentMaterialService->delete($customAttachmentMaterial);
        }
    }
}