import { ROUTES } from '@/Support/constants/routes';
import { serviceFactory } from '@/Services/serviceFactory';
import { ComponentResource } from '@/Support/interfaces/resources';

export const componentService = {
    ...serviceFactory<ComponentResource>(ROUTES.COMPONENTS),
    customFunctionExample: async () => {
        console.log('custom function');
    },
};
