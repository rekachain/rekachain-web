<?php

namespace App\Http\Middleware;

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
            $userInitials = strtoupper($nameParts[0][0] . $nameParts[1][0]);
        }

        return [
            ...parent::share($request),
            'auth' => [
                'user' => array_merge(
                    optional($request->user())->toArray() ?? [],
                    ['photo' => optional($request->user())->photo ?? null],
                    ['role' => optional($request->user())->roles?->first()->name ?? null],
                    ['initials' => $userInitials]
                ),
            ],
        ];
    }
}
