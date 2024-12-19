import { serviceFactory } from '@/Services/serviceFactory';
import { ROUTES } from '@/Support/Constants/routes.js';
import { RoleResource } from '@/Support/Interfaces/Resources/RoleResource';

export const roleService = {
    ...serviceFactory<RoleResource>(ROUTES.ROLES),
};
