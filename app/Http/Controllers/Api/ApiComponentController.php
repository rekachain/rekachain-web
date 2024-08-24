<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Component\StoreComponentRequest;
use App\Http\Requests\Component\UpdateComponentRequest;
use App\Http\Resources\ComponentResource;
use App\Models\Component;
use App\Support\Interfaces\Services\ComponentServiceInterface;
use Illuminate\Http\Request;

class ApiComponentController extends Controller {
    public function __construct(
        protected ComponentServiceInterface $componentService
    ) {}

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request) {
        // $request->checkPermissionEnum(PermissionEnum::COMPONENT_READ);
        $perPage = request()->get('perPage', 15);

        return ComponentResource::collection($this->componentService->with([])->getAllPaginated(request()->query(), $perPage));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreComponentRequest $request) {
        // $request->checkPermissionEnum(PermissionEnum::COMPONENT_CREATE);
        $component = $this->componentService->create($request->validated());

        return new ComponentResource($component->load('panel', 'progress'));
    }

    /**
     * Display the specified resource.
     */
    public function show(Component $component) {
        // $request->checkPermissionEnum(PermissionEnum::COMPONENT_READ);
        return new ComponentResource($component->load('panel', 'progress'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateComponentRequest $request, Component $component) {
        // $request->checkPermissionEnum(PermissionEnum::COMPONENT_UPDATE);
        $this->componentService->update($component, $request->validated());

        return new ComponentResource($component->load('panel', 'progress'));

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id) {
        //
    }
}
