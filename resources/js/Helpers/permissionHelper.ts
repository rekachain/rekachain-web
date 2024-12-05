import { PERMISSION_ENUM } from '@/Support/Enums/permissionEnum';

import { usePage } from '@inertiajs/react';

export const checkPermission = (permissions: PERMISSION_ENUM | PERMISSION_ENUM[], strict: boolean = false): boolean => {
    const { user } = usePage().props.auth;

    if (user.role === 'Super Admin') {
        return true;
    }

    if (Array.isArray(permissions)) {
        return strict
            ? permissions.every(permission => user.permissions.includes(permission))
            : permissions.some(permission => user.permissions.includes(permission));
    }

    return user.permissions.includes(permissions);
};