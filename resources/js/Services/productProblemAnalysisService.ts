import { serviceFactory } from '@/Services/serviceFactory';
import { ROUTES } from '@/Support/Constants/routes';
import { ProductProblemAnalysisResource } from '@/Support/Interfaces/Resources';

export const productProblemAnalysisService = {
    ...serviceFactory<ProductProblemAnalysisResource>(ROUTES.PRODUCT_PROBLEM_ANALYSES),
    customFunctionExample: async () => {
        console.log('custom function');
    },
};
