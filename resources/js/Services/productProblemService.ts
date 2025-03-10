import { ROUTES } from '@/Support/Constants/routes';
import { serviceFactory } from '@/Services/serviceFactory';
import { ProductProblemResource } from '@/Support/Interfaces/Resources';

export const productProblemService = {
    ...serviceFactory<ProductProblemResource>(ROUTES.PRODUCT_PROBLEMS),
    customFunctionExample: async () => {
        console.log('custom function');
    },
};