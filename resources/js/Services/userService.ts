import {ROUTES} from '@/Support/Constants/routes.js';
import {serviceFactory} from '@/Services/serviceFactory';
import {UserResource} from '../Support/Interfaces/Resources';

export const userService = {
    ...serviceFactory<UserResource>(ROUTES.USERS),
    customFunctionExample: async () => {
        console.log('custom function');
    },
};
