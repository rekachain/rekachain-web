import { ROUTES } from '@/Support/Constants/routes';
import { serviceFactory } from '@/Services/serviceFactory';
import { TrainsetAttachmentResource } from '@/Support/Interfaces/Resources';

export const trainsetAttachmentService = {
    ...serviceFactory<TrainsetAttachmentResource>(ROUTES.TRAINSET_ATTACHMENTS),
    customFunctionExample: async () => {
        console.log('custom function');
    },
};