import { ROUTES } from '@/Support/constants/routes';
import { serviceFactory } from '@/Services/serviceFactory';
import { DetailWorkerPanelResource } from '@/Support/interfaces/resources';

export const detailWorkerPanelService = {
    ...serviceFactory<DetailWorkerPanelResource>(ROUTES.DETAIL_WORKER_PANELS),
    customFunctionExample: async () => {
        console.log('custom function');
    },
};
