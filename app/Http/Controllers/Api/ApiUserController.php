<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\User\StoreUserRequest;
use App\Http\Requests\User\UpdateUserRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use App\Support\Enums\IntentEnum;
use App\Support\Enums\PermissionEnum;
use App\Support\Interfaces\Services\RoleServiceInterface;
use App\Support\Interfaces\Services\UserServiceInterface;
use Illuminate\Http\Request;

class ApiUserController extends ApiController {
    public function __construct(
        protected UserServiceInterface $userService,
        protected RoleServiceInterface $roleService) {}

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request) {
        checkPermissions(PermissionEnum::USER_READ);

        $perPage = request()->get('perPage', 5);

        return UserResource::collection($this->userService->getAllPaginated($request->query(), $perPage));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserRequest $request) {
        checkPermissions(PermissionEnum::USER_CREATE);

        return $this->userService->create($request->validated());
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user) {
        checkPermissions(PermissionEnum::USER_READ);

        return new UserResource($user->load(['roles' => ['division', 'permissions']]));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, User $user) {
        if ($user->id !== auth()->id()) {
            checkPermissions(PermissionEnum::USER_UPDATE);
        }

        $intent = request()->get('intent');
        if ($intent === IntentEnum::API_USER_UPDATE_PASSWORD->value) {
            return $this->userService->apiUpdatePassword($user, $request->validated());
        }

        return $this->userService->update($user, $request->validated());
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, User $user) {
        checkPermissions(PermissionEnum::USER_DELETE);

        return $this->userService->delete($user);
    }
}
