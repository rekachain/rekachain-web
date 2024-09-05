import { ROUTES } from '@/support/constants/routes.js';
import { serviceFactory } from '@/services/serviceFactory';
import { PanelResource } from '@/support/interfaces/resources';
import { IntentEnum } from '@/support/enums/intentEnum';

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
};
