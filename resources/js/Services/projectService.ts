import { ROUTES } from '@/Support/constants/routes.js';
import { serviceFactory } from '@/Services/serviceFactory';
import { ProjectResource } from '@/Support/interfaces/resources';
import { IntentEnum } from '@/Support/enums/intentEnum';

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
};
