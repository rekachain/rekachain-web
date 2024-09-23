import { ROUTES } from '@/Support/Constants/routes';
import { serviceFactory } from '@/Services/serviceFactory';
import { ComponentResource } from '../Support/Interfaces/Resources';

export const componentService = {
    ...serviceFactory<ComponentResource>(ROUTES.COMPONENTS),
    customFunctionExample: async () => {
        console.log('custom function');
    },
};
