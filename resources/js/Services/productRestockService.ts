import { ROUTES } from '@/Support/Constants/routes';
import { serviceFactory } from '@/Services/serviceFactory';
import { ProductRestockResource } from '@/Support/Interfaces/Resources';

export const productRestockService = {
    ...serviceFactory<ProductRestockResource>(ROUTES.PRODUCT_RESTOCKS),
    customFunctionExample: async () => {
        console.log('custom function');
    },
};