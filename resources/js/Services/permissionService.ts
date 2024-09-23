import { ROUTES } from '@/Support/constants/routes.js';
import { serviceFactory } from '@/Services/serviceFactory';
import { PermissionResource } from '@/Support/interfaces/resources';

export const permissionService = {
    ...serviceFactory<PermissionResource>(ROUTES.PERMISSIONS),
};
