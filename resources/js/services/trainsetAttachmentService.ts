import { ROUTES } from '@/support/constants/routes';
import { serviceFactory } from '@/services/serviceFactory';
import { TrainsetAttachmentResource } from '@/support/interfaces/resources';

export const trainsetAttachmentService = {
    ...serviceFactory<TrainsetAttachmentResource>(ROUTES.TRAINSET_ATTACHMENTS),
    customFunctionExample: async () => {
        console.log('custom function');
    },
};