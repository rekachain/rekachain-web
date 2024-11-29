import { serviceFactory } from '@/Services/serviceFactory';
import { ROUTES } from '@/Support/Constants/routes';
import { TrainsetAttachmentHandlerResource } from '@/Support/Interfaces/Resources';

export const trainsetAttachmentHandlerService = {
    ...serviceFactory<TrainsetAttachmentHandlerResource>(ROUTES.TRAINSET_ATTACHMENT_HANDLERS),
    customFunctionExample: async () => {
        console.log('custom function');
    },
};
