import { ROUTES } from '@/Support/Constants/routes';
import { serviceFactory } from '@/Services/serviceFactory';
import { TrainsetAttachmentResource } from '@/Support/Interfaces/Resources';
import { IntentEnum } from '@/Support/Enums/intentEnum';
import { ProjectImportProgressMaterialOverride } from '@/Support/Interfaces/Types';

export const trainsetAttachmentService = {
    ...serviceFactory<TrainsetAttachmentResource>(ROUTES.TRAINSET_ATTACHMENTS),
    downloadCustomAttachmentMaterialImportTemplate: async (trainsetAttachmentId: number) => {
        const response = await window.axios.get(route(`${ROUTES.TRAINSET_ATTACHMENTS}.show`, trainsetAttachmentId), {
            responseType: 'blob',
            params: {
                intent: IntentEnum.WEB_TRAINSET_ATTACHMENT_GET_CUSTOM_ATTACHMENT_MATERIAL_IMPORT_TEMPLATE,
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
    importCustomAttachmentMaterial: async (
        trainsetAttachmentId: number,
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

        return await window.axios.post(route(`${ROUTES.TRAINSET_ATTACHMENTS}.show`, trainsetAttachmentId), formData, {
            params: {
                _method: 'PUT',
                intent: IntentEnum.WEB_TRAINSET_ATTACHMENT_ASSIGN_REFERENCED_ATTACHMENT_AND_MATERIAL_IMPORT,
            },
        });
    },
};
