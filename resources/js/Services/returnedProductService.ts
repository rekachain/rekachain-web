import { serviceFactory } from '@/Services/serviceFactory';
import { ROUTES } from '@/Support/Constants/routes';
import { IntentEnum } from '@/Support/Enums/intentEnum';
import { PaginateResponse } from '@/Support/Interfaces/Others';
import { ComponentResource, ReturnedProductResource } from '@/Support/Interfaces/Resources';

export const returnedProductService = {
    ...serviceFactory<ReturnedProductResource>(ROUTES.RETURNED_PRODUCTS),
    addProductProblem: async (
        returnedProductId: number,
        componentId: number | null,
        componentName: string,
        componentDescription: string,
        selectedCause: string,
        selectedStatus: string,
        image_path: any[],
        note: string | null,
    ) => {
        const formData = new FormData();
        formData.append('component_id', componentId?.toString() ?? '');
        formData.append('new_component_name', componentName);
        formData.append('new_component_description', componentDescription);
        formData.append('cause', selectedCause);
        formData.append('status', selectedStatus);
        image_path.length > 0 && formData.append('image_path', image_path[0]);
        note && formData.append('note', note ?? '');
        return await window.axios.post(
            route(`${ROUTES.RETURNED_PRODUCTS}.update`, returnedProductId),
            formData,
            {
                params: {
                    _method: 'PUT',
                    intent: IntentEnum.WEB_RETURNED_PRODUCT_ADD_PRODUCT_PROBLEM,
                },
            },
        );
    },
    downloadImportReturnedProductTemplate: async () => {
        window.location.href =
            '/assets/excel-templates/imports/aftersales/returned-product-import.xlsx';
    },
    downloadImportReturnedProductProblemTemplate: async () => {
        window.location.href =
            '/assets/excel-templates/imports/aftersales/product-problem-import.xlsx';
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
        return await window.axios.post(
            route(`${ROUTES.RETURNED_PRODUCTS}.update`, returnedProductId),
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                params: {
                    _method: 'PUT',
                    intent: IntentEnum.WEB_RETURNED_PRODUCT_IMPORT_PRODUCT_PROBLEM,
                },
            },
        );
    },
    getComponents: async (
        returnedProductId: number,
        isScrapping: boolean,
    ): Promise<PaginateResponse<ComponentResource>> => {
        return await window.axios.get(
            route(`${ROUTES.RETURNED_PRODUCTS}.show`, returnedProductId),
            {
                params: {
                    intent: isScrapping
                        ? IntentEnum.WEB_RETURNED_PRODUCT_GET_RETURNED_PRODUCT_COMPONENTS
                        : IntentEnum.WEB_RETURNED_PRODUCT_GET_PRODUCT_PROBLEM_COMPONENTS,
                },
            },
        );
    },
    scrapStocks: async (returnedProductId: number, data: any) => {
        return await window.axios.put(
            route(`${ROUTES.RETURNED_PRODUCTS}.update`, returnedProductId),
            data,
            {
                params: {
                    intent: IntentEnum.WEB_RETURNED_PRODUCT_UPDATE_REPLACEMENT_STOCK_FOR_SCRAP,
                },
            },
        );
    },
    retrieveStocks: async (returnedProductId: number, data: any) => {
        return await window.axios.put(
            route(`${ROUTES.RETURNED_PRODUCTS}.update`, returnedProductId),
            data,
            {
                params: {
                    intent: IntentEnum.WEB_RETURNED_PRODUCT_UPDATE_REPLACEMENT_STOCK,
                },
            },
        );
    },
};
export const requestReturnService = {
    ...serviceFactory<ReturnedProductResource>(ROUTES.REQUESTED_RETURNS),
};
