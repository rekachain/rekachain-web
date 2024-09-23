import { ROUTES } from '@/Support/constants/routes.js';
import { serviceFactory } from '@/Services/serviceFactory';
import { RoleResource } from '@/Support/interfaces/resources/RoleResource';

export const roleService = {
    ...serviceFactory<RoleResource>(ROUTES.ROLES),
};
