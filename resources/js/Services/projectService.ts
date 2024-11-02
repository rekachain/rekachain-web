import { ROUTES } from '@/Support/Constants/routes.js';
import { serviceFactory } from '@/Services/serviceFactory';
import { ProjectResource } from '@/Support/Interfaces/Resources';
import { IntentEnum } from '@/Support/Enums/intentEnum';

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
    downloadImportProjectTemplate: async () => {
        window.location.href = '/assets/excel-templates/imports/project/project-import.xlsm';
    },
    importProject: async (file: File) => {
        const formData = new FormData();
        formData.append('file', file);
        return await window.axios.post(route(`${ROUTES.PROJECTS}.store`), formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            params: {
                intent: IntentEnum.WEB_PROJECT_IMPORT_PROJECT_TEMPLATE,
            },
        });
    },
};
