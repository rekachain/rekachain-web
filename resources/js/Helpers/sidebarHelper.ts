import { PERMISSION_ENUM } from '@/Support/Enums/permissionEnum';

import { usePage } from '@inertiajs/react';

export const checkPermission = (permission: PERMISSION_ENUM): boolean => {
    const { user } = usePage().props.auth;

    if (user.role === 'Super Admin') {
        return true;
    }

    return user.permissions.includes(permission);
};
