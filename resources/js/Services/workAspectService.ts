import { serviceFactory } from '@/Services/serviceFactory';
import { ROUTES } from '@/Support/Constants/routes';
import { WorkAspectResource } from '@/Support/Interfaces/Resources';

export const workAspectService = {
    ...serviceFactory<WorkAspectResource>(ROUTES.WORK_ASPECTS),
    customFunctionExample: async () => {
        console.log('custom function');
    },
};
