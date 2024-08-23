import { ROUTES } from '@/support/constants/routes.js';
import { serviceFactory } from '@/services/serviceFactory';
import { PresetTrainsetResource, ProjectResource, TrainsetResource } from '@/support/interfaces/resources';
import { IntentEnum } from '@/support/enums/intentEnum';
import { AxiosResponse } from 'axios';

export const projectService = {
    ...serviceFactory<ProjectResource>(ROUTES.PROJECTS),
    addTrainset: async (projectId: number, trainsetNeeded: number) => {
        await window.axios.post(
            route(`${ROUTES.PROJECTS}.show`, projectId),
            {
                trainset_needed: trainsetNeeded,
            },
            {
                params: {
                    _method: 'PUT',
                    intent: IntentEnum.WEB_PROJECT_ADD_TRAINSET,
                },
            },
        );
    },
    getTrainsetCarriages: async (
        projectId: number,
        trainsetId: number,
    ): Promise<
        AxiosResponse<{
            trainset: TrainsetResource;
            presetTrainsets: PresetTrainsetResource[];
        }>
    > => {
        return await window.axios.get(route(`${ROUTES.PROJECTS_TRAINSETS_CARRIAGES}.index`, [projectId, trainsetId]));
    },
};
