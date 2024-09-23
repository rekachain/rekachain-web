import { ROUTES } from '@/Support/constants/routes';
import { serviceFactory } from '@/Services/serviceFactory';
import { WorkDayResource } from '@/Support/interfaces/resources';

export const workDayService = {
    ...serviceFactory<WorkDayResource>(ROUTES.WORK_DAYS),
    customFunctionExample: async () => {
        console.log('custom function');
    },
};
