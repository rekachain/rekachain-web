import { ROUTES } from '@/support/constants/routes.js';
import { serviceFactory } from '@/services/serviceFactory';
import { UserResource } from '@/support/interfaces/resources';

export const userService = {
    ...serviceFactory<UserResource>(ROUTES.USERS),
    customFunctionExample: async () => {
        console.log('custom function');
    },
};
