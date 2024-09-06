import { ROUTES } from '@/support/constants/routes';
import { serviceFactory } from '@/services/serviceFactory';
import { WorkDayTimeResource } from '@/support/interfaces/resources';

export const workDayTimeService = {
    ...serviceFactory<WorkDayTimeResource>(ROUTES.WORK_DAY_TIMES),
    customFunctionExample: async () => {
        console.log('custom function');
    },
};