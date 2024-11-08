import { ROUTES } from '@/Support/Constants/routes.js';
import { serviceFactory } from '@/Services/serviceFactory';
import { CarriageResource } from '@/Support/Interfaces/Resources';
import { IntentEnum } from '@/Support/Enums/intentEnum';

export const carriageService = {
    ...serviceFactory<CarriageResource>(ROUTES.CARRIAGES),
    downloadImportDataTemplate: async () => {
        const response = await window.axios.get(
            route(`${ROUTES.CARRIAGES}.index`, {
                intent: IntentEnum.WEB_CARRIAGE_GET_TEMPLATE_IMPORT_CARRIAGE,
            }),
            { responseType: 'blob' },
        );

        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'carriages.xlsx');
        document.body.appendChild(link);
        link.click();
        link.remove();
    },
    importData: async (file: File) => {
        const formData = new FormData();
        formData.append('import_file', file);
        return await window.axios.post(route(`${ROUTES.CARRIAGES}.store`), formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            params: {
                intent: IntentEnum.WEB_CARRIAGE_IMPORT_CARRIAGE,
            },
        });
    },
};
