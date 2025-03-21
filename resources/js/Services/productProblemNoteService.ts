import { serviceFactory } from '@/Services/serviceFactory';
import { ROUTES } from '@/Support/Constants/routes';
import { ProductProblemNoteResource } from '@/Support/Interfaces/Resources';

export const productProblemNoteService = {
    ...serviceFactory<ProductProblemNoteResource>(ROUTES.PRODUCT_PROBLEM_NOTES),
    customFunctionExample: async () => {
        console.log('custom function');
    },
};
