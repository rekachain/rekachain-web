import { ROUTES } from '@/support/constants/routes';
import { serviceFactory } from '@/services/serviceFactory';
import { ComponentResource } from '@/support/interfaces/resources';

export const componentService = {
    ...serviceFactory<ComponentResource>(ROUTES.COMPONENTS),
    customFunctionExample: async () => {
        console.log('custom function');
    },
};
