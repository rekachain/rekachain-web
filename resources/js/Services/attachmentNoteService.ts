import { ROUTES } from '@/Support/Constants/routes';
import { serviceFactory } from '@/Services/serviceFactory';
import { AttachmentNoteResource } from '@/Support/Interfaces/Resources';

export const attachmentNoteService = {
    ...serviceFactory<AttachmentNoteResource>(ROUTES.ATTACHMENT_NOTES),
    customFunctionExample: async () => {
        console.log('custom function');
    },
};