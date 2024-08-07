import { ROUTES } from '@/support/constants/routes.js';
import { serviceFactory } from '@/services/serviceFactory';
import { RoleResource } from '@/support/interfaces/resources/RoleResource';
import { PermissionResource } from '@/support/interfaces/resources';

export const permissionService = {
    ...serviceFactory<PermissionResource>(ROUTES.PERMISSIONS),
};
