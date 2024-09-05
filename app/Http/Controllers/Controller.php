<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

class Controller extends BaseController {
    use AuthorizesRequests, ValidatesRequests;

    /**
     * Determine if the request is an AJAX request.
     */
    protected function ajax(): bool {
        if ($this->isTestRoute()) {
            return true;
        }

        return !request()->inertia() && request()->expectsJson();
    }

    /**
     * Determine if the request is a test route.
     */
    private function isTestRoute(): bool {
        return str_starts_with(\Route::currentRouteName(), 'test-');
    }
}
