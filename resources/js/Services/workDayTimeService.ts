import { ROUTES } from '@/Support/constants/routes';
import { serviceFactory } from '@/Services/serviceFactory';
import { WorkDayTimeResource } from '@/Support/interfaces/resources';

export const workDayTimeService = {
    ...serviceFactory<WorkDayTimeResource>(ROUTES.WORK_DAY_TIMES),
    customFunctionExample: async () => {
        console.log('custom function');
    },
};
