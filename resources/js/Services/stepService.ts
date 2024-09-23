import { ROUTES } from '@/Support/Constants/routes';
import { serviceFactory } from '@/Services/serviceFactory';
import { StepResource } from '../Support/Interfaces/Resources';
import { IntentEnum } from '@/Support/Enums/intentEnum';

export const stepService = {
    ...serviceFactory<StepResource>(ROUTES.STEPS),
    importData: async (file: File) => {
        const formData = new FormData();
        formData.append('import_file', file);
        return await window.axios.post(route(`${ROUTES.STEPS}.store`), formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            params: {
                intent: IntentEnum.WEB_STEP_IMPORT_STEP,
            },
        });
    },
};
