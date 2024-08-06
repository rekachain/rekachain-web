<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ApiAuthLoginRequest;
use App\Http\Resources\RoleResource;
use App\Http\Resources\UserResource;

class ApiAuthController extends Controller {
    public function login(ApiAuthLoginRequest $request) {
        if (auth()->attempt($request->only('nip', 'password'))) {
            return response()->json([
                'user' => new UserResource(auth()->user()),
                'token' => auth()->user()->createToken('token')->plainTextToken,
                'role' => new RoleResource(auth()->user()->roles()->first()),
                'permissions' => auth()->user()->roles()->first()->permissions->pluck('name'),
            ]);
        }

        return response()->json([
            'message' => 'Invalid login details',
        ], 401);
    }

    public function logout() {
        auth()->user()->tokens()->delete();

        return response()->json([
            'message' => 'Logged out',
        ]);
    }
}
