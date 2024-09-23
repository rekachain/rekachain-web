import { ROUTES } from '@/Support/constants/routes';
import { serviceFactory } from '@/Services/serviceFactory';
import { ProgressStepResource } from '@/Support/interfaces/resources';

export const progressStepService = {
    ...serviceFactory<ProgressStepResource>(ROUTES.PROGRESS_STEPS),
    customFunctionExample: async () => {
        console.log('custom function');
    },
};
