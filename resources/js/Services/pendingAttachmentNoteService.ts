import { ROUTES } from '@/Support/Constants/routes';
import { serviceFactory } from '@/Services/serviceFactory';
import { PendingAttachmentNoteResource } from '@/Support/Interfaces/Resources';

export const pendingAttachmentNoteService = {
    ...serviceFactory<PendingAttachmentNoteResource>(ROUTES.PENDING_ATTACHMENT_NOTES),
    customFunctionExample: async () => {
        console.log('custom function');
    },
};