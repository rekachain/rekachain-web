<?php

namespace App\Helpers;

use App\Support\Enums\PermissionEnum;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpKernel\Exception\HttpException;

class PermissionHelper {
    /**
     * Check user permissions.
     *
     * @param  PermissionEnum|array  $permissions  Can be a single permission or an array of permissions.
     *
     * @throws HttpException
     */
    public static function check(PermissionEnum|array $permissions): void {
        $user = Auth::user(); // Using Auth facade for consistency

        // Ensure we work with an array
        $permissions = is_array($permissions) ? $permissions : [$permissions];

        foreach ($permissions as $permission) {
            if (!$user->can($permission->value)) {
                abort(403, 'Unauthorized');
            }
        }
    }
}
