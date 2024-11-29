import { serviceFactory } from '@/Services/serviceFactory';
import { ROUTES } from '@/Support/Constants/routes';
import { WorkDayResource } from '@/Support/Interfaces/Resources';

export const workDayService = {
    ...serviceFactory<WorkDayResource>(ROUTES.WORK_DAYS),
    customFunctionExample: async () => {
        console.log('custom function');
    },
};
