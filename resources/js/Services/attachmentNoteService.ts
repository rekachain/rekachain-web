import { serviceFactory } from '@/Services/serviceFactory';
import { ROUTES } from '@/Support/Constants/routes';
import { AttachmentNoteResource } from '@/Support/Interfaces/Resources';

export const attachmentNoteService = {
    ...serviceFactory<AttachmentNoteResource>(ROUTES.ATTACHMENT_NOTES),
    customFunctionExample: async () => {
        console.log('custom function');
    },
};
