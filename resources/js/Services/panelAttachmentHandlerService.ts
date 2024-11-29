import { serviceFactory } from '@/Services/serviceFactory';
import { ROUTES } from '@/Support/Constants/routes';
import { PanelAttachmentHandlerResource } from '@/Support/Interfaces/Resources';

export const panelAttachmentHandlerService = {
    ...serviceFactory<PanelAttachmentHandlerResource>(ROUTES.PANEL_ATTACHMENT_HANDLERS),
    customFunctionExample: async () => {
        console.log('custom function');
    },
};
