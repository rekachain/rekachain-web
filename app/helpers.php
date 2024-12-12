<?php

use App\Helpers\PermissionHelper;
use App\Support\Enums\PermissionEnum;
use App\Support\Enums\RoleEnum;
use Symfony\Component\HttpKernel\Exception\HttpException;

if (!function_exists('checkPermissions')) {
    /**
     * Check user permissions.
     *
     * @param  PermissionEnum|array  $permissions  Can be a single permission or an array of permissions.
     *
     * @throws HttpException
     */
    function checkPermissions(PermissionEnum|array $permissions, bool $returnBool = false, bool $strict = false): ?bool {
        return PermissionHelper::checkPermissions($permissions, $returnBool, $strict);
    }

    /**
     * Check user roles.
     */
    function checkRoles(RoleEnum|array $roles, bool $returnBool = false, bool $strict = false): ?bool {
        return PermissionHelper::checkRoles($roles, $returnBool, $strict);
    }

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
    function checkPermissionsAndRoles(PermissionEnum|array $permissions = [], RoleEnum|array $roles = [], bool $returnBool = false, bool $strict = false): ?bool {
        return PermissionHelper::check($permissions, $roles, $returnBool, $strict);
    }
}
