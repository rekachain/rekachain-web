<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

class ApiSearchController extends Controller {
    public function search(Request $request) {
        $query = strtolower($request->get('q'));

        $routes = collect(Route::getRoutes())
            ->filter(function ($route) {
                // Only get GET routes that render pages
                return $route->methods()[0] === 'GET' &&
                       !str_contains($route->uri(), 'api') &&
                       !str_contains($route->uri(), '_') &&
                       !str_contains($route->uri(), 'sanctum') &&
                       !str_contains($route->uri(), 'logout') &&
                       !str_contains($route->uri(), 'login');
            })
            ->map(function ($route, $key) {
                return [
                    'id' => $key,
                    'title' => ucwords(str_replace(['/', '-'], [' > ', ' '], $route->uri())),
                    'url' => '/' . $route->uri(),
                ];
            })
            ->filter(function ($route) use ($query) {
                return str_contains(strtolower($route['title']), $query);
            })
            ->values();

        return response()->json($routes);
    }
}
