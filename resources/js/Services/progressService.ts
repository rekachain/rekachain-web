import { serviceFactory } from '@/Services/serviceFactory';
import { ROUTES } from '@/Support/Constants/routes.js';
import { IntentEnum } from '@/Support/Enums/intentEnum';
import { ProgressResource } from '@/Support/Interfaces/Resources';

export const progressService = {
    ...serviceFactory<ProgressResource>(ROUTES.PROGRESS),
    createStep: async (
        progress_id: number,
        step_id: number | null,
        step_name: string | null,
        step_process: string | null,
        step_estimated_time: number | null,
    ) => {
        const formData = new FormData();

        if (step_id) {
            formData.append('step_id', step_id.toString());
            formData.append('step_name', '');
            formData.append('step_process', '');
            formData.append('step_estimated_time', '');
        } else {
            formData.append('step_id', '');
            formData.append('step_name', step_name!);
            formData.append('step_process', step_process!);
            formData.append('step_estimated_time', step_estimated_time!.toString());
        }

        return await window.axios.post(route(`${ROUTES.PROGRESS}.update`, progress_id), formData, {
            params: {
                _method: 'PUT',
                intent: IntentEnum.WEB_PROGRESS_CREATE_STEP,
            },
        });
    },
};
