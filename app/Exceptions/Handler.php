<?php

namespace App\Exceptions;

use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Inertia\Inertia;
use Throwable;

class Handler extends ExceptionHandler {
    /**
     * The list of the inputs that are never flashed to the session on validation exceptions.
     *
     * @var array<int, string>
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    /**
     * Register the exception handling callbacks for the application.
     */
    public function register(): void {
        $this->reportable(function (Throwable $e) {
            //
        });
    }

    public function render($request, Throwable $e) {
        if (($e instanceof \Illuminate\Auth\AuthenticationException && $this->unauthenticated($request, $e))
            || (!app()->isProduction() && config('app.debug'))) {
            return parent::render($request, $e);
        }

        $statusCode = method_exists($e, 'getStatusCode') ? $e->getStatusCode() : 500;

        if (!$request->inertia() && $request->expectsJson()) {
            return response()->json([
                'message' => $e->getMessage(),
            ], $statusCode);
        }

        return Inertia::render('Error', [
            'status' => $statusCode,
            'message' => $e->getMessage(),
        ]);
    }
}
