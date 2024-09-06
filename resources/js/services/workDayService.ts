import { ROUTES } from '@/support/constants/routes';
import { serviceFactory } from '@/services/serviceFactory';
import { WorkDayResource } from '@/support/interfaces/resources';

export const workDayService = {
    ...serviceFactory<WorkDayResource>(ROUTES.WORK_DAYS),
    customFunctionExample: async () => {
        console.log('custom function');
    },
};
