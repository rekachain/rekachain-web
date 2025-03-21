import { ROUTES } from '@/Support/Constants/routes';
import { serviceFactory } from '@/Services/serviceFactory';
import { ReplacementStockResource } from '@/Support/Interfaces/Resources';

export const replacementStockService = {
    ...serviceFactory<ReplacementStockResource>(ROUTES.REPLACEMENT_STOCKS),
    customFunctionExample: async () => {
        console.log('custom function');
    },
};