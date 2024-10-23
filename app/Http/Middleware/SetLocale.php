<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;

class SetLocale {
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next) {
        $locale = $request->header('Accept-Language');

        if (in_array($locale, ['en', 'fr', 'es', 'id'])) {
            App::setLocale($locale);
        }

        return $next($request);
    }
}
