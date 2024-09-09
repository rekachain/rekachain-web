import { ROUTES } from '@/support/constants/routes';
import { serviceFactory } from '@/services/serviceFactory';
import { PanelAttachmentResource } from '@/support/interfaces/resources';

export const panelAttachmentService = {
    ...serviceFactory<PanelAttachmentResource>(ROUTES.PANEL_ATTACHMENTS),
    customFunctionExample: async () => {
        console.log('custom function');
    },
};
