<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\User\StoreUserRequest;
use App\Http\Requests\User\UpdateUserRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use App\Support\Enums\PermissionEnum;
use App\Support\Interfaces\RoleServiceInterface;
use App\Support\Interfaces\UserServiceInterface;
use Illuminate\Http\Request;

class ApiUserController extends ApiController {
    public function __construct(
        protected UserServiceInterface $userService,
        protected RoleServiceInterface $roleService) {}

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request) {
        $request->checkPermissionEnum(PermissionEnum::USER_READ);

        $perPage = request()->get('perPage', 5);

        return UserResource::collection($this->userService->getAllPaginated($request->query(), $perPage));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserRequest $request) {
        return $this->userService->create($request->validated());
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user) {
        return new UserResource($user->load(['roles' => ['division', 'permissions']]));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, User $user) {
        $intent = request()->get('intent');
        if ($intent === 'api.user.update.password') {
            return $this->userService->apiUpdatePassword($user, $request->validated());
        }

        return $this->userService->update($user, $request->validated());
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, User $user) {
        return $this->userService->delete($user);
    }
}
