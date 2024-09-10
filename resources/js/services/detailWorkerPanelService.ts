import { ROUTES } from '@/support/constants/routes';
import { serviceFactory } from '@/services/serviceFactory';
import { DetailWorkerPanelResource } from '@/support/interfaces/resources';

export const detailWorkerPanelService = {
    ...serviceFactory<DetailWorkerPanelResource>(ROUTES.DETAIL_WORKER_PANELS),
    customFunctionExample: async () => {
        console.log('custom function');
    },
};