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
     * @param  bool  $returnBool  If true, return a boolean instead of aborting.
     * @param  bool  $strict  If true, all permissions must be granted. If false, at least one permission must be granted.
     *
     * @throws HttpException
     */
    public static function check(PermissionEnum|array $permissions, bool $returnBool = false, bool $strict = false): ?bool {
        $user = Auth::user(); // Using Auth facade for consistency

        // Ensure we work with an array
        $permissions = is_array($permissions) ? $permissions : [$permissions];

        $hasPermission = false;

        foreach ($permissions as $permission) {
            if ($user->can($permission->value)) {
                if (!$strict) {
                    return true; // If non-strict, return true on first granted permission
                }
                $hasPermission = true;
            } else {
                if ($strict) {
                    if ($returnBool) {
                        return false; // If strict, return false on first denied permission
                    }
                    abort(403, __('exception.auth.permission.permission_exception', ['permission' => $permission->value])); // If strict, abort on first denied permission
                }
            }
        }

        if ($strict && !$hasPermission) {
            if ($returnBool) {
                return false;
            }
            abort(403, __('exception.auth.permission.permission_exception'));
        }

        return true;
    }
}
