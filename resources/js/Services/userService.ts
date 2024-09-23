import {ROUTES} from '@/Support/constants/routes.js';
import {serviceFactory} from '@/Services/serviceFactory';
import {UserResource} from '@/Support/interfaces/resources';

export const userService = {
    ...serviceFactory<UserResource>(ROUTES.USERS),
    customFunctionExample: async () => {
        console.log('custom function');
    },
};
