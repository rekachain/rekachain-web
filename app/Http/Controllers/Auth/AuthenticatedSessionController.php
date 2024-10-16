<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Providers\RouteServiceProvider;
use App\Support\Enums\RoleEnum;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;

class AuthenticatedSessionController extends Controller {
    /**
     * Display the login view.
     */
    public function create(): Response {
        return Inertia::render('Auth/Login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
        ]);
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request): RedirectResponse {
        $request->authenticate();

        $request->session()->regenerate();

        $user = Auth::user();
        $allowedRoles = [
            RoleEnum::SUPER_ADMIN->value,
            RoleEnum::PPC_PERENCANAAN->value,
            RoleEnum::PPC_PENGENDALIAN->value,
            RoleEnum::SUPERVISOR_MEKANIK->value,
            RoleEnum::SUPERVISOR_ELEKTRIK->value,
            RoleEnum::SUPERVISOR_ASSEMBLY->value,
        ];

        if (!in_array($user->roles()->first()?->name, $allowedRoles)) {
            Auth::guard('web')->logout();
            $request->session()->invalidate();
            $request->session()->regenerateToken();

            // TODO: login_error doesnt show, might check this later
            return redirect('/')->withErrors(['login_error' => __('validation.custom.auth.unauthorized')]);
        }

        return redirect()->intended(RouteServiceProvider::HOME);
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/');
    }
}
