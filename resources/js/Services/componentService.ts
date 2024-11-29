import { serviceFactory } from '@/Services/serviceFactory';
import { ROUTES } from '@/Support/Constants/routes';
import { IntentEnum } from '@/Support/Enums/intentEnum';
import { ComponentResource } from '@/Support/Interfaces/Resources';

export const componentService = {
    ...serviceFactory<ComponentResource>(ROUTES.COMPONENTS),
    downloadImportDataTemplate: async () => {
        //  NOTE: not implemented yet
        const response = await window.axios.get(
            route(`${ROUTES.COMPONENTS}.index`, {
                // intent: IntentEnum.WEB_COMPONENT_GET_TEMPLATE_IMPORT_COMPONENT,
            }),
            { responseType: 'blob' },
        );

        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'components.xlsx');
        document.body.appendChild(link);
        link.click();
        link.remove();
    },
    downloadImportProgressRawMaterialTemplate: async (componentId: number) => {
        const response = await window.axios.get(route(`${ROUTES.COMPONENTS}.show`, componentId), {
            responseType: 'blob',
            params: {
                intent: IntentEnum.WEB_COMPONENT_GET_COMPONENT_MATERIAL_AND_PROGRESS_TEMPLATE,
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
