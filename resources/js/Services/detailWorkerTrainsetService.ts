import { serviceFactory } from '@/Services/serviceFactory';
import { ROUTES } from '@/Support/Constants/routes';
import { DetailWorkerTrainsetResource } from '@/Support/Interfaces/Resources';

export const detailWorkerTrainsetService = {
    ...serviceFactory<DetailWorkerTrainsetResource>(ROUTES.DETAIL_WORKER_TRAINSETS),
    customFunctionExample: async () => {
        console.log('custom function');
    },
};
