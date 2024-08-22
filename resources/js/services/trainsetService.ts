import { ROUTES } from '@/support/constants/routes.js';
import { serviceFactory } from '@/services/serviceFactory';
import { TrainsetResource } from '@/support/interfaces/resources';
import { IntentEnum } from '@/support/enums/intentEnum';

export const trainsetService = {
    ...serviceFactory<TrainsetResource>(ROUTES.TRAINSETS),
    changePreset: async (trainsetId: number, presetTrainsetId: number) => {
        return window.axios.post(
            route(`${ROUTES.TRAINSETS}.update`, trainsetId),
            {
                preset_trainset_id: presetTrainsetId,
            },
            {
                params: {
                    _method: 'PUT',
                    intent: IntentEnum.WEB_PROJECT_CHANGE_TRAINSET_PRESET,
                },
            },
        );
    },
    savePreset: async (trainsetId: number, projectId: number, presetName: string) => {
        return window.axios.post(
            route(`${ROUTES.TRAINSETS}.update`, trainsetId),
            {
                preset_name: presetName,
                project_id: projectId,
            },
            {
                params: {
                    _method: 'PUT',
                    intent: IntentEnum.WEB_PROJECT_SAVE_TRAINSET_PRESET,
                },
            },
        );
    },
    deleteCarriageTrainset: async (projectId: number, carriageTrainsetId: number) => {
        await window.axios.post(
            route(`${ROUTES.TRAINSETS}.update`, projectId),
            {
                carriage_trainset_id: carriageTrainsetId,
            },
            {
                params: {
                    _method: 'PUT',
                    intent: IntentEnum.WEB_TRAINSET_DELETE_CARRIAGE_TRAINSET,
                },
            },
        );
    },
};
