import { ROUTES } from '@/support/constants/routes.js';
import { serviceFactory } from '@/services/serviceFactory';
import { RoleResource } from '@/support/interfaces/resources/RoleResource';

export const roleService = {
    ...serviceFactory<RoleResource>(ROUTES.ROLES),
};
