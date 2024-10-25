<?php

use App\Helpers\PermissionHelper;
use App\Support\Enums\PermissionEnum;
use Symfony\Component\HttpKernel\Exception\HttpException;

if (!function_exists('cp')) {
    /**
     * Check user permissions.
     *
     * @param  PermissionEnum|array  $permissions  Can be a single permission or an array of permissions.
     *
     * @throws HttpException
     */
    function cp(PermissionEnum|array $permissions): void {
        PermissionHelper::check($permissions);
    }
}
