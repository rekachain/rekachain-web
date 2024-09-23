import { ROUTES } from '@/Support/constants/routes';
import { serviceFactory } from '@/Services/serviceFactory';
import { PanelAttachmentHandlerResource } from '@/Support/interfaces/resources';

export const panelAttachmentHandlerService = {
    ...serviceFactory<PanelAttachmentHandlerResource>(ROUTES.PANEL_ATTACHMENT_HANDLERS),
    customFunctionExample: async () => {
        console.log('custom function');
    },
};
