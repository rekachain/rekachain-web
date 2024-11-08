import { ROUTES } from '@/Support/Constants/routes';
import { serviceFactory } from '@/Services/serviceFactory';
import { ProgressStepResource } from '@/Support/Interfaces/Resources';

export const progressStepService = {
    ...serviceFactory<ProgressStepResource>(ROUTES.PROGRESS_STEPS),
    customFunctionExample: async () => {
        console.log('custom function');
    },
};
