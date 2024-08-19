import { ROUTES } from '@/support/constants/routes.js';
import { serviceFactory } from '@/services/serviceFactory';
import { PermissionResource } from '@/support/interfaces/resources';

export const permissionService = {
    ...serviceFactory<PermissionResource>(ROUTES.PERMISSIONS),
};
