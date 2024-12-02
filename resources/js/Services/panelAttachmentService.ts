import { serviceFactory } from '@/Services/serviceFactory';
import { ROUTES } from '@/Support/Constants/routes';
import { IntentEnum } from '@/Support/Enums/intentEnum';
import { PanelAttachmentResource } from '@/Support/Interfaces/Resources';
import { ProjectImportProgressMaterialOverride } from '@/Support/Interfaces/Types';

export const panelAttachmentService = {
    ...serviceFactory<PanelAttachmentResource>(ROUTES.PANEL_ATTACHMENTS),
    downloadCustomAttachmentMaterialImportTemplate: async (panelAttachmentId: number) => {
        const response = await window.axios.get(
            route(`${ROUTES.PANEL_ATTACHMENTS}.show`, panelAttachmentId),
            {
                responseType: 'blob',
                params: {
                    intent: IntentEnum.WEB_PANEL_ATTACHMENT_GET_CUSTOM_ATTACHMENT_MATERIAL_IMPORT_TEMPLATE,
                },
            },
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
    importCustomAttachmentMaterial: async (
        panelAttachmentId: number,
        file: File,
        toBeAssigned: boolean,
        override: ProjectImportProgressMaterialOverride,
    ) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('to_be_assigned', toBeAssigned ? '1' : '0');

        if (override !== 'default') {
            formData.append('override', override === 'override' ? '1' : '0');
        }

        return await window.axios.post(
            route(`${ROUTES.PANEL_ATTACHMENTS}.show`, panelAttachmentId),
            formData,
            {
                params: {
                    _method: 'PUT',
                    intent: IntentEnum.WEB_PANEL_ATTACHMENT_ASSIGN_REFERENCED_ATTACHMENT_AND_MATERIAL_IMPORT,
                },
            },
        );
    },
};
