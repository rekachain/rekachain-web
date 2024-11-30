import { serviceFactory } from '@/Services/serviceFactory';
import { ROUTES } from '@/Support/Constants/routes.js';
import { IntentEnum } from '@/Support/Enums/intentEnum';
import { PanelResource } from '@/Support/Interfaces/Resources';

export const panelService = {
    ...serviceFactory<PanelResource>(ROUTES.PANELS),
    downloadImportDataTemplate: async () => {
        const response = await window.axios.get(
            route(`${ROUTES.PANELS}.index`, {
                intent: IntentEnum.WEB_PANEL_GET_TEMPLATE_IMPORT_PANEL,
            }),
            { responseType: 'blob' },
        );

        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'panels.xlsx');
        document.body.appendChild(link);
        link.click();
        link.remove();
    },
    importData: async (file: File) => {
        const formData = new FormData();
        formData.append('import_file', file);
        return await window.axios.post(route(`${ROUTES.PANELS}.store`), formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            params: {
                intent: IntentEnum.WEB_PANEL_IMPORT_PANEL,
            },
        });
    },
    downloadImportProgressRawMaterialTemplate: async (panelId: number) => {
        const response = await window.axios.get(route(`${ROUTES.PANELS}.show`, panelId), {
            responseType: 'blob',
            params: {
                intent: IntentEnum.WEB_PANEL_GET_PANEL_MATERIAL_AND_PROGRESS_TEMPLATE,
            },
        });

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
};
