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
        return PermissionHelper::check($permissions, $returnBool, $strict);
    }

    /**
     * Check user roles.
     */
    function checkRoles(RoleEnum|array $roles, bool $returnBool = false, bool $strict = false): ?bool {
        return PermissionHelper::checkRoles($roles, $returnBool, $strict);
    }
}
