<?php

namespace App\Helpers;

use App\Support\Enums\PermissionEnum;
use App\Support\Enums\RoleEnum;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpKernel\Exception\HttpException;

class PermissionHelper {
    /**
     * Check user permissions and roles.
     *
     * @param  PermissionEnum|array  $permissions  Can be a single permission or an array of permissions.
     * @param  RoleEnum|array  $roles  Can be a single role or an array of roles.
     * @param  bool  $returnBool  If true, return a boolean instead of aborting.
     * @param  bool  $strict  If true, all permissions must be granted. If false, at least one permission must be granted.
     *
     * @throws HttpException
     */
    public static function check(PermissionEnum|array $permissions = [], RoleEnum|array $roles = [], bool $returnBool = false, bool $strict = false): ?bool {
        if (empty($permissions) && empty($roles)) {
            return true;
        } else {
            if (!empty($permissions) && empty($roles)) {
                return self::checkPermissions($permissions, false, $strict);
            } elseif (empty($permissions) && !empty($roles)) {
                return self::checkRoles($roles, false, $strict);
            } else {
                $check = false;
                $permissionsCheck = self::checkPermissions($permissions, true, $strict);
                $rolesCheck = self::checkRoles($roles, true, $strict);
        
                if (!$permissionsCheck && !$rolesCheck) {
                    if ($returnBool) {
                        $check = false;
                    }
                } else {
                    $check = $strict ? ($permissionsCheck && $rolesCheck) : ($permissionsCheck || $rolesCheck);                    
                }
                return $check ? true : abort(403, __('exception.auth.permission_and_role.permission_and_role_exception', [
                    'permission' => implode(', ', array_map(fn ($perm) => $perm->value, $permissions)),
                    'conjunction' => $strict ? '&' : '/',
                    'role' => implode(', ', array_map(fn ($role) => $role->value, $roles)),
                ]));
            }
        }
    }

    /**
     * Check user permissions.
     *
     * @param  PermissionEnum|array  $permissions  Can be a single permission or an array of permissions.
     * @param  bool  $returnBool  If true, return a boolean instead of aborting.
     * @param  bool  $strict  If true, all permissions must be granted. If false, at least one permission must be granted.
     *
     * @throws HttpException
     */
    public static function checkPermissions(PermissionEnum|array $permissions, bool $returnBool = false, bool $strict = false): ?bool {
        $user = Auth::user(); // Using Auth facade for consistency

        // Ensure we work with an array
        $permissions = is_array($permissions) ? $permissions : [$permissions];

        foreach ($permissions as $permission) {
            if ($user->can($permission->value)) {
                if (!$strict) {
                    return true;
                }
            } elseif ($strict) {
                if ($returnBool) {
                    return false;
                }
                abort(403, __('exception.auth.permission.permission_exception', ['permission' => $permission->value]));
            }
        }

        return $returnBool ? false : abort(403, __('exception.auth.permission.permission_exception', ['permission' => implode(', ', array_map(fn ($perm) => $perm->value, $permissions))]));
    }

    /**
     * Check user roles.
     */
    public static function checkRoles(RoleEnum|array $roles, bool $returnBool = false, bool $strict = false): ?bool {
        $user = Auth::user(); // Using Auth facade for consistency

        // Ensure we work with an array
        $roles = is_array($roles) ? $roles : [$roles];

        foreach ($roles as $role) {
            if ($user->hasRole($role->value)) {
                if (!$strict) {
                    return true;
                }
            } elseif ($strict) {
                if ($returnBool) {
                    return false;
                }
                abort(403, __('exception.auth.role.role_exception', ['role' => $role->value]));
            }
        }

        return $returnBool ? false : abort(403, __('exception.auth.role.role_exception', ['role' => implode(', ', array_map(fn ($role) => $role->value, $roles))]));
    }
}
