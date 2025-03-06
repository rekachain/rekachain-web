import { ROUTES } from '@/Support/Constants/routes';
import { serviceFactory } from '@/Services/serviceFactory';
import { ReturnedProductResource } from '@/Support/Interfaces/Resources';

export const returnedProductService = {
    ...serviceFactory<ReturnedProductResource>(ROUTES.RETURNED_PRODUCTS),
    customFunctionExample: async () => {
        console.log('custom function');
    },
};