<?php

namespace App\Http\Controllers;

use App\Http\Requests\Role\StoreRoleRequest;
use App\Http\Requests\Role\UpdateRoleRequest;
use App\Http\Resources\DivisionResource;
use App\Http\Resources\PermissionResource;
use App\Http\Resources\RoleResource;
use App\Models\Role;
use App\Support\Enums\PermissionEnum;
use App\Helpers\PermissionHelper;
use App\Support\Interfaces\Services\DivisionServiceInterface;
use App\Support\Interfaces\Services\PermissionServiceInterface;
use App\Support\Interfaces\Services\RoleServiceInterface;
use Illuminate\Http\Request;

class RoleController extends Controller {
    public function __construct(
        protected RoleServiceInterface $roleService,
        protected PermissionServiceInterface $permissionService,
        protected DivisionServiceInterface $divisionService) {
        //
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request) {
        PermissionHelper::check(PermissionEnum::ROLE_READ);

        if ($this->ajax()) {
            $perPage = request()->get('perPage', 5);

            return RoleResource::collection($this->roleService->getAllPaginated($request->query(), $perPage));
        }

        return inertia('Role/Index');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create() {

        PermissionHelper::check(PermissionEnum::ROLE_CREATE);

        // sementara
        $permissions = PermissionResource::collectionGrouped($this->permissionService->getAll());

        $divisions = DivisionResource::collection($this->divisionService->getAll());

        return inertia('Role/Create', ['permissions' => $permissions, 'divisions' => $divisions]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRoleRequest $request) {
        PermissionHelper::check(PermissionEnum::ROLE_CREATE);

        if ($this->ajax()) {
            return $this->roleService->create($request->validated());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Role $role) {
        PermissionHelper::check(PermissionEnum::ROLE_READ);

        if ($this->ajax()) {
            return new RoleResource($role);
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Role $role) {
        PermissionHelper::check(PermissionEnum::ROLE_UPDATE);

        // sementara
        $permissions = PermissionResource::collectionGrouped($this->permissionService->getAll());

        $divisions = DivisionResource::collection($this->divisionService->getAll());

        return inertia('Role/Edit', [
            'role' => new RoleResource($role->load('division')),
            'permissions' => $permissions,
            'divisions' => $divisions,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRoleRequest $request, Role $role) {
        PermissionHelper::check(PermissionEnum::ROLE_UPDATE);

        if ($this->ajax()) {
            return $this->roleService->update($role, $request->validated());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Role $role) {
        PermissionHelper::check(PermissionEnum::ROLE_DELETE);

        if ($this->ajax()) {
            return $this->roleService->delete($role);
        }
    }
}
