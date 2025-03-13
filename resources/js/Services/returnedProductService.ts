import { ROUTES } from '@/Support/Constants/routes';
import { serviceFactory } from '@/Services/serviceFactory';
import { ReturnedProductResource } from '@/Support/Interfaces/Resources';
import { IntentEnum } from '@/Support/Enums/intentEnum';

export const returnedProductService = {
    ...serviceFactory<ReturnedProductResource>(ROUTES.RETURNED_PRODUCTS),
    downloadImportReturnedProductTemplate: async () => {
        window.location.href = '/assets/excel-templates/imports/aftersales/returned-product-import.xlsx';
    },
    downloadImportReturnedProductProblemTemplate: async () => {
        window.location.href = '/assets/excel-templates/imports/aftersales/product-problem-import.xlsx';
    },
    importData: async (file: File) => {
        const formData = new FormData();
        formData.append('import_file', file);
        return await window.axios.post(route(`${ROUTES.RETURNED_PRODUCTS}.store`), formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            params: {
                intent: IntentEnum.WEB_RETURNED_PRODUCT_IMPORT_RETURNED_PRODUCT_AND_PRODUCT_PROBLEM,
            },
        });
    },
    importProductProblemData: async (returnedProductId: number, file: File) => {
        const formData = new FormData();
        formData.append('import_file', file);
        return await window.axios.post(route(`${ROUTES.RETURNED_PRODUCTS}.update`, returnedProductId), formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            params: {
                _method: 'PUT',
                intent: IntentEnum.WEB_RETURNED_PRODUCT_IMPORT_PRODUCT_PROBLEM,
            },
        });
    },
};
export const requestReturnService = {
    ...serviceFactory<ReturnedProductResource>(ROUTES.REQUESTED_RETURNS),
};