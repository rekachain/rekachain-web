<?php

namespace App\Http\Middleware;

use App\Http\Resources\UserResource;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware {
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array {

        $userInitials = null;

        if ($user = $request->user()) {
            $nameParts = explode(' ', $user->name);
            if (count($nameParts) == 1) {
                $userInitials = strtoupper($nameParts[0][0]);
            } else {
                $userInitials = strtoupper($nameParts[0][0] . $nameParts[1][0]);
            }
        }

        return [
            ...parent::share($request),
            'auth' => [
                'user' => array_merge(
                    UserResource::make(optional($request->user()))->resolve() ?? [],
                    ['role' => optional($request->user())->roles?->first()->name ?? null],
                    ['initials' => $userInitials],
                    ['permissions' => optional($request->user())->getAllPermissions()?->pluck('name')->toArray() ?? []],
                ),
            ],
        ];
    }
}
