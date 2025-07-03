import { serviceFactory } from '@/Services/serviceFactory';
import { ROUTES } from '@/Support/Constants/routes';
import { IntentEnum } from '@/Support/Enums/intentEnum';
import { ProductRestockResource } from '@/Support/Interfaces/Resources';

export const productRestockService = {
    ...serviceFactory<ProductRestockResource>(ROUTES.PRODUCT_RESTOCKS),
    customFunctionExample: async () => {
        console.log('custom function');
    },
    initiateRestockProject: async (data: any) => {
        return await window.axios.post(route(`${ROUTES.PRODUCT_RESTOCKS}.store`), data, {
            params: {
                intent: IntentEnum.WEB_PRODUCT_RESTOCK_INITIATE_PROJECT,
            },
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    },
};
