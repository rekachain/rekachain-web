import { ROUTES } from '@/Support/Constants/routes.js';
import { serviceFactory } from '@/Services/serviceFactory';
import { ProgressResource } from '@/Support/Interfaces/Resources';
import { IntentEnum } from '@/Support/Enums/intentEnum';

export const progressService = {
    ...serviceFactory<ProgressResource>(ROUTES.PROGRESS),
    createStep: async (
        progress_id: number,
        step_id: number | null,
        step_name: string | null,
        step_process: string | null,
        step_estimated_time: number | null,
    ) => {
        return await window.axios.post(
            route(`${ROUTES.PROGRESS}.update`, progress_id),
            {
                step_id,
                step_name,
                step_process,
                step_estimated_time,
            },
            {
                params: {
                    _method: 'PUT',
                    intent: IntentEnum.WEB_PROGRESS_CREATE_STEP,
                },
            },
        );
    },
};
