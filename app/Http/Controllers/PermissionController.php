<?php

namespace App\Http\Controllers;

use App\Http\Requests\Permission\StorePermissionRequest;
use App\Http\Requests\Permission\UpdatePermissionRequest;
use App\Http\Resources\PermissionResource;
use App\Models\Permission;
use App\Support\Enums\PermissionEnum;
use App\Helpers\PermissionHelper;
use App\Support\Interfaces\Services\PermissionServiceInterface;
use Illuminate\Http\Request;

class PermissionController extends Controller {

    public function __construct(protected PermissionServiceInterface $permissionService) {}

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request) {
        PermissionHelper::check(PermissionEnum::PERMISSION_READ);

        if ($this->ajax()) {
            $perPage = $request->get('perPage', 5);

            return PermissionResource::collection($this->permissionService->getAllPaginated($request->query(), $perPage));
        }

        return inertia('Permission/Index');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create() {
        PermissionHelper::check(PermissionEnum::PERMISSION_CREATE);

        return inertia('Permission/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePermissionRequest $request) {
        PermissionHelper::check(PermissionEnum::PERMISSION_CREATE);

        if ($this->ajax()) {
            return $this->permissionService->create($request->validated());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Permission $permission) {
        PermissionHelper::check(PermissionEnum::PERMISSION_READ);

        if ($this->ajax()) {
            return new PermissionResource($permission);
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Permission $permission) {
        PermissionHelper::check(PermissionEnum::PERMISSION_UPDATE);

        if ($this->ajax()) {
            return new PermissionResource($permission);
        }

        return inertia('Permission/Edit', compact('permission'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePermissionRequest $request, Permission $permission) {
        return 'This feature is not yet implemented.';
        PermissionHelper::check(PermissionEnum::PERMISSION_UPDATE);

        if ($this->ajax()) {
            return $this->permissionService->update($permission, $request->validated());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Permission $permission) {
        return 'This feature is not yet implemented.';
        PermissionHelper::check(PermissionEnum::PERMISSION_DELETE);

        if ($this->ajax()) {
            return $this->permissionService->delete($permission);
        }
    }
}
