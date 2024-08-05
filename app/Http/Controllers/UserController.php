<?php

namespace App\Http\Controllers;

use App\Http\Requests\User\StoreUserRequest;
use App\Http\Requests\User\UpdateUserRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use App\Support\Enums\PermissionEnum;
use App\Support\Interfaces\UserServiceInterface;
use Illuminate\Http\Request;
use Psr\Container\ContainerExceptionInterface;
use Psr\Container\NotFoundExceptionInterface;

class UserController extends Controller {
    public function __construct(protected UserServiceInterface $userService) {}

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request) {

        $request->checkPermissionEnum(PermissionEnum::USER_READ);

        if ($this->ajax()) {
            try {
                $perPage = request()->get('perPage', 5);

                return UserResource::collection($this->userService->getAllPaginated($request->query(), $perPage));
            } catch (NotFoundExceptionInterface|ContainerExceptionInterface $e) {
            }
        }

        return inertia('User/Index');

    }

    /**
     * Show the form for creating a new resource.
     */
    public function create() {
        return inertia('User/Create');
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
        return inertia('User/Edit', ['user' => new UserResource($user)]);
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
