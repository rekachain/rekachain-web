import { ROUTES } from '@/Support/constants/routes';
import { serviceFactory } from '@/Services/serviceFactory';
import { PanelAttachmentResource } from '@/Support/interfaces/resources';

export const panelAttachmentService = {
    ...serviceFactory<PanelAttachmentResource>(ROUTES.PANEL_ATTACHMENTS),
    customFunctionExample: async () => {
        console.log('custom function');
    },
};
