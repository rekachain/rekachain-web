import { ROUTES } from '@/Support/Constants/routes';
import { serviceFactory } from '@/Services/serviceFactory';
import { WorkDayTimeResource } from '../Support/Interfaces/Resources';

export const workDayTimeService = {
    ...serviceFactory<WorkDayTimeResource>(ROUTES.WORK_DAY_TIMES),
    customFunctionExample: async () => {
        console.log('custom function');
    },
};
