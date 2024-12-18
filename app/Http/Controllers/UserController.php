<?php

namespace App\Http\Controllers;

use App\Helpers\PermissionHelper;
use App\Http\Requests\User\StoreUserRequest;
use App\Http\Requests\User\UpdateUserRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use App\Support\Enums\IntentEnum;
use App\Support\Enums\PermissionEnum;
use App\Support\Interfaces\Services\RoleServiceInterface;
use App\Support\Interfaces\Services\UserServiceInterface;
use Exception;
use Illuminate\Http\Request;

class UserController extends Controller {
    public function __construct(
        protected UserServiceInterface $userService,
        protected RoleServiceInterface $roleService) {}

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request) {
        PermissionHelper::check(PermissionEnum::USER_READ);

        if ($this->ajax()) {
            $perPage = request()->get('perPage', 5);

            // TODO: refactor using trait
            $request->whenHas('trashed', function ($value) use ($request, $perPage) {
                if ($value === 'only') {
                    return UserResource::collection($this->userService->onlyTrashed()->getAllPaginated($request->query(), $perPage));
                }

                return UserResource::collection($this->userService->withTrashed()->getAllPaginated($request->query(), $perPage));

            });

            return UserResource::collection($this->userService->getAllPaginated($request->query(), $perPage));
        }

        return inertia('User/Index');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request) {
        PermissionHelper::check([PermissionEnum::USER_CREATE]);

        $roles = $this->roleService->getAll();

        return inertia('User/Create', compact('roles'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserRequest $request) {
        PermissionHelper::check(PermissionEnum::USER_CREATE);

        if ($this->ajax()) {
            return $this->userService->create($request->validated());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user) {
        PermissionHelper::check(PermissionEnum::USER_READ);

        if ($this->ajax()) {
            return new UserResource($user);
        }

        return inertia('User/Show', ['user' => new UserResource($user)]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user) {
        PermissionHelper::check(PermissionEnum::USER_UPDATE);

        $user = new UserResource($user->load('roles', 'workstation', 'step'));
        $roles = $this->roleService->getAll();

        return inertia('User/Edit', compact('user', 'roles'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, User $user) {
        if ($user->id === auth()->id()) { // User is updating his own profile
            return $this->userService->update($user, $request->validated());
        }

        PermissionHelper::check(PermissionEnum::USER_UPDATE);

        if ($this->ajax()) {
            return $this->userService->update($user, $request->validated());
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @throws Exception
     */
    public function destroy(Request $request, User $user) {
        PermissionHelper::check(PermissionEnum::USER_DELETE);

        $intent = $request->get('intent');

        if ($this->ajax()) {
            if ($intent === IntentEnum::SOFT_DELETE_ENTRY->value) {
                $this->userService->softDelete($user);

                return response('', 204);
            }

            return $this->userService->delete($user);
        }
    }
}
