import { ROUTES } from '@/support/constants/routes.js';
import { serviceFactory } from '@/services/serviceFactory';
import { TrainsetResource } from '@/support/interfaces/resources';
import { IntentEnum } from '@/support/enums/intentEnum';

export const trainsetService = {
    ...serviceFactory<TrainsetResource>(ROUTES.TRAINSETS),
    updatePreset: async (trainsetId: number, presetTrainsetId: number) => {
        return window.axios.post(
            route(`${ROUTES.TRAINSETS}.update`, trainsetId),
            {
                preset_trainset_id: presetTrainsetId,
            },
            {
                params: {
                    intent: IntentEnum.WEB_PROJECT_UPDATE_TRAINSET_PRESET,
                },
            },
        );
    },
};
