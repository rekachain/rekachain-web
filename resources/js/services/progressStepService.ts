import { ROUTES } from '@/support/constants/routes';
import { serviceFactory } from '@/services/serviceFactory';
import { ProgressStepResource } from '@/support/interfaces/resources';

export const progressStepService = {
    ...serviceFactory<ProgressStepResource>(ROUTES.PROGRESS_STEPS),
    customFunctionExample: async () => {
        console.log('custom function');
    },
};