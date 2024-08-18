<?php

namespace App\Http\Controllers;

use App\Http\Requests\User\StoreUserRequest;
use App\Http\Requests\User\UpdateUserRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use App\Support\Enums\PermissionEnum;
use App\Support\Interfaces\RoleServiceInterface;
use App\Support\Interfaces\UserServiceInterface;
use Illuminate\Http\Request;
use Psr\Container\ContainerExceptionInterface;
use Psr\Container\NotFoundExceptionInterface;

class UserController extends Controller {
    public function __construct(
        protected UserServiceInterface $userService,
        protected RoleServiceInterface $roleService) {}

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request) {

        $request->checkPermissionEnum(PermissionEnum::USER_READ);

        if ($request->user()->can('user-read')) {
            if ($this->ajax()) {
                try {
                    $perPage = request()->get('perPage', 5);

                    return UserResource::collection($this->userService->getAllPaginated($request->query(), $perPage));
                } catch (NotFoundExceptionInterface|ContainerExceptionInterface $e) {
                }
            }

            return inertia('User/Index');
        }

    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request) {

        $request->checkPermissionEnum(PermissionEnum::USER_CREATE);

        $roles = $this->roleService->getAll();

        return inertia('User/Create', compact('roles'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserRequest $request) {
        if ($this->ajax()) {
            return $this->userService->create($request->validated());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user) {
        if ($this->ajax()) {
            return new UserResource($user);
        }

        return inertia('User/Show', ['user' => new UserResource($user)]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user) {
        $user = new UserResource($user);
        $roles = $this->roleService->getAll();

        return inertia('User/Edit', compact('user', 'roles'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, User $user) {
        if ($this->ajax()) {
            return $this->userService->update($user, $request->validated());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, User $user) {
        if ($this->ajax()) {
            return $this->userService->delete($user);
        }
    }
}
