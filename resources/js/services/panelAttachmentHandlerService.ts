import { ROUTES } from '@/support/constants/routes';
import { serviceFactory } from '@/services/serviceFactory';
import { PanelAttachmentHandlerResource } from '@/support/interfaces/resources';

export const panelAttachmentHandlerService = {
    ...serviceFactory<PanelAttachmentHandlerResource>(ROUTES.PANEL_ATTACHMENT_HANDLERS),
    customFunctionExample: async () => {
        console.log('custom function');
    },
};