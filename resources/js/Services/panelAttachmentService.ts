import { ROUTES } from '@/Support/Constants/routes';
import { serviceFactory } from '@/Services/serviceFactory';
import { PanelAttachmentResource } from '../Support/Interfaces/Resources';

export const panelAttachmentService = {
    ...serviceFactory<PanelAttachmentResource>(ROUTES.PANEL_ATTACHMENTS),
    customFunctionExample: async () => {
        console.log('custom function');
    },
};
