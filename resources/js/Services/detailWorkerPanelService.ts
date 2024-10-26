import { ROUTES } from '@/Support/Constants/routes';
import { serviceFactory } from '@/Services/serviceFactory';
import { DetailWorkerPanelResource } from '@/Support/Interfaces/Resources';

export const detailWorkerPanelService = {
    ...serviceFactory<DetailWorkerPanelResource>(ROUTES.DETAIL_WORKER_PANELS),
    customFunctionExample: async () => {
        console.log('custom function');
    },
};
