import { serviceFactory } from '@/Services/serviceFactory';
import { ROUTES } from '@/Support/Constants/routes';
import { IntentEnum } from '@/Support/Enums/intentEnum';
import { ReplacementStockResource } from '@/Support/Interfaces/Resources';

export const replacementStockService = {
    ...serviceFactory<ReplacementStockResource>(ROUTES.REPLACEMENT_STOCKS),
    downloadImportDataTemplate: async () => {
        const response = await window.axios.get(
            route(`${ROUTES.REPLACEMENT_STOCKS}.index`, {
                intent: IntentEnum.WEB_REPLACEMENT_STOCK_GET_TEMPLATE_IMPORT_REPLACEMENT_STOCK,
            }),
            { responseType: 'blob' },
        );

        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        const disposition = response.headers['content-disposition'];
        const filename = disposition.split(';')[1].split('=')[1].trim().replace(/"/g, '');
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();
        link.remove();
    },
    importData: async (file: File) => {
        const formData = new FormData();
        formData.append('import_file', file);
        return await window.axios.post(route(`${ROUTES.REPLACEMENT_STOCKS}.store`), formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            params: {
                intent: IntentEnum.WEB_REPLACEMENT_STOCK_IMPORT_REPLACEMENT_STOCK,
            },
        });
    },
    scrapStocks: async (data: any) => {
        return await window.axios.post(route(`${ROUTES.REPLACEMENT_STOCKS}.store`), data, {
            params: {
                intent: IntentEnum.WEB_REPLACEMENT_STOCK_UPDATE_REPLACEMENT_STOCK_FROM_RETURNED_PRODUCT,
            },
        });
    },
    retrieveStocks: async (data: any) => {
        return await window.axios.post(route(`${ROUTES.REPLACEMENT_STOCKS}.store`), data, {
            params: {
                intent: IntentEnum.WEB_REPLACEMENT_STOCK_UPDATE_REPLACEMENT_STOCK_FOR_RETURNED_PRODUCT,
            },
        });
    },
};
