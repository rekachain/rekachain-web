<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\ApiAuthLoginRequest;
use App\Http\Resources\RoleResource;
use App\Http\Resources\UserResource;

class ApiAuthController extends ApiController {
    /**
     * @OA\Post(
     *     path="/api/login",
     *     summary="Login user",
     *     description="Authenticate user and return user details, token, role, and permissions",
     *     tags={"Auth"},
     *
     *     @OA\RequestBody(
     *         required=true,
     *
     *         @OA\JsonContent(
     *             required={"nip", "password"},
     *
     *             @OA\Property(property="nip", type="string", example="1"),
     *             @OA\Property(property="password", type="string", example="password")
     *         )
     *     ),
     *
     *     @OA\Response(
     *         response=200,
     *         description="Successful login",
     *
     *         @OA\JsonContent(
     *
     *             @OA\Property(property="user", ref="#/components/schemas/UserResource"),
     *             @OA\Property(property="token", type="string", example="102ej1209dj21doljdlaskjd1902odj"),
     *             @OA\Property(property="role", ref="#/components/schemas/RoleResource"),
     *             @OA\Property(property="permissions", type="array", @OA\Items(type="string"))
     *         )
     *     ),
     *
     *     @OA\Response(
     *         response=401,
     *         description="Invalid login details",
     *
     *         @OA\JsonContent(
     *
     *             @OA\Property(property="message", type="string", example="Invalid login details")
     *         )
     *     )
     * )
     */
    public function login(ApiAuthLoginRequest $request) {
        if (auth()->attempt($request->only('nip', 'password'))) {
            return response()->json([
                'user' => new UserResource(auth()->user()),
                'token' => auth()->user()->createToken('token')->plainTextToken,
                'role' => new RoleResource(auth()->user()->roles()->first()),
                'division' => auth()->user()->roles()->first()->division,
                'permissions' => auth()->user()->roles()->first()->permissions->pluck('name'),
            ]);
        }

        return response()->json([
            'message' => __('auth.failed'),
        ], 401);
    }

    /**
     * @OA\GET(
     *     path="/api/logout",
     *     summary="Logout user",
     *     description="Revoke all tokens for the authenticated user",
     *     tags={"Auth"},
     *
     *     @OA\Response(
     *         response=200,
     *         description="Successful logout",
     *
     *         @OA\JsonContent(
     *
     *             @OA\Property(property="message", type="string", example="Logged out")
     *         )
     *     ),
     *
     *     @OA\Response(
     *         response=401,
     *         description="Unauthenticated",
     *
     *         @OA\JsonContent(
     *
     *             @OA\Property(property="message", type="string", example="Unauthenticated")
     *         )
     *     )
     * )
     */
    public function logout() {
        auth()->user()->tokens()->delete();

        return response()->json([
            'message' => __('auth.logout'),
        ]);
    }
}
