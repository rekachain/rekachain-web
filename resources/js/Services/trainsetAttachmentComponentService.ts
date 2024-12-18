import { serviceFactory } from '@/Services/serviceFactory';
import { ROUTES } from '@/Support/Constants/routes';
import { TrainsetAttachmentComponentResource } from '@/Support/Interfaces/Resources';

export const trainsetAttachmentComponentService = {
    ...serviceFactory<TrainsetAttachmentComponentResource>(ROUTES.TRAINSET_ATTACHMENT_COMPONENTS),
    customFunctionExample: async () => {
        console.log('custom function');
    },
};
