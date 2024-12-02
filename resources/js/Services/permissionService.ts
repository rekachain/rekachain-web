import { serviceFactory } from '@/Services/serviceFactory';
import { ROUTES } from '@/Support/Constants/routes.js';
import { PermissionResource } from '@/Support/Interfaces/Resources';

export const permissionService = {
    ...serviceFactory<PermissionResource>(ROUTES.PERMISSIONS),
};
