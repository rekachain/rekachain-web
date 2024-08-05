<?php

namespace App\Http\Controllers;

use App\Http\Resources\RoleResource;
use App\Models\Role;
use App\Support\Enums\PermissionEnum;
use App\Support\Interfaces\RoleServiceInterface;
use Illuminate\Http\Request;

class RoleController extends Controller {
    public function __construct(protected RoleServiceInterface $roleService) {}

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request) {

        $request->checkPermissionEnum(PermissionEnum::ROLE_READ);

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
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request) {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Role $role) {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Role $role) {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Role $role) {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Role $role) {
        //
    }
}
