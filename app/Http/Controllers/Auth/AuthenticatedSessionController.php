<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Providers\RouteServiceProvider;
use App\Support\Enums\PermissionEnum;
use App\Support\Enums\RoleEnum;
use App\Support\Interfaces\Services\ProjectServiceInterface;
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
        if (empty($user->nip) && $user->can(PermissionEnum::DASHBOARD_COMMISSION_READ->value)) {
            $projectService = app(ProjectServiceInterface::class);
            $project = $projectService->find(['buyer_id' => $user->id])->first();

            return redirect()->route('dashboard.trainset', ['project' => $project->id, 'trainset' => $project->trainsets()->first()->id]);
        }
        $unAllowedRole = [
            RoleEnum::WORKER_MEKANIK->value,
            RoleEnum::WORKER_ELEKTRIK->value,
            RoleEnum::WORKER_ASSEMBLY->value,
            RoleEnum::QC_MEKANIK->value,
            RoleEnum::QC_ELEKTRIK->value,
            RoleEnum::QC_ASSEMBLY->value,
        ];

        if (in_array($user->roles()->first()?->name, $unAllowedRole)) {
            Auth::guard('web')->logout();
            $request->session()->invalidate();
            $request->session()->regenerateToken();

            abort(403, __('exception.auth.unauthorized'));
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
