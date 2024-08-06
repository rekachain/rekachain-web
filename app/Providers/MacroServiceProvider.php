<?php

namespace App\Providers;

use Illuminate\Http\Request;
use Illuminate\Support\ServiceProvider;

class MacroServiceProvider extends ServiceProvider {
    public function boot() {

        Request::macro('checkPermission', function (string $permission) {
            if (!$this->user()->can($permission)) {
                abort(403, 'Unauthorized');
            }
        });

        Request::macro('checkPermissionEnum', function ($permissionEnum) {
            if (!$this->user()->can($permissionEnum->value)) {
                abort(403, 'Unauthorized');
            }
        });
    }
}
