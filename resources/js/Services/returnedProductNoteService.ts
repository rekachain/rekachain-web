import { serviceFactory } from '@/Services/serviceFactory';
import { ROUTES } from '@/Support/Constants/routes';
import { ReturnedProductNoteResource } from '@/Support/Interfaces/Resources';

export const returnedProductNoteService = {
    ...serviceFactory<ReturnedProductNoteResource>(ROUTES.RETURNED_PRODUCT_NOTES),
    customFunctionExample: async () => {
        console.log('custom function');
    },
};
