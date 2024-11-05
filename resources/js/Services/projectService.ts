import { ROUTES } from '@/Support/Constants/routes.js';
import { serviceFactory } from '@/Services/serviceFactory';
import { ProjectPanelResource, ProjectResource } from '@/Support/Interfaces/Resources';
import { IntentEnum } from '@/Support/Enums/intentEnum';
import { ProjectComponentResource } from '@/Support/Interfaces/Resources/ProjectComponentResource';
import { PaginateResponse } from '@/Support/Interfaces/Others';
import { ServiceFilterOptions } from '@/Support/Interfaces/Others/ServiceFilterOptions';
import { AxiosRequestConfig } from 'axios';

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
    downloadImportProgressRawMaterialTemplate: async () => {
        window.location.href =
            '/assets/excel-templates/imports/progress-raw-materials/progress-raw-material-import.xlsx';
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
    getComponents: async (
        projectId: number,
        filters: ServiceFilterOptions = {},
        config: AxiosRequestConfig = {},
    ): Promise<PaginateResponse<ProjectComponentResource>> => {
        const response = await window.axios.get(route(`${ROUTES.PROJECTS}.show`, projectId), {
            params: {
                intent: IntentEnum.WEB_PROJECT_GET_ALL_COMPONENTS_WITH_QTY,
                ...filters,
                ...config,
            },
        });
        return response.data;
    },
    getPanels: async (
        projectId: number,
        filters: ServiceFilterOptions = {},
        config: AxiosRequestConfig = {},
    ): Promise<PaginateResponse<ProjectPanelResource>> => {
        const response = await window.axios.get(route(`${ROUTES.PROJECTS}.show`, projectId), {
            params: {
                intent: IntentEnum.WEB_PROJECT_GET_ALL_PANELS_WITH_QTY,
                ...filters,
                ...config,
            },
        });
        return response.data;
    },
    importComponentsProgressRawMaterial: async (
        projectId: number,
        file: File,
        componentId: number,
        workAspectId: number,
    ) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('component_id', componentId.toString());
        formData.append('work_aspect_id', workAspectId.toString());
        return await window.axios.post(route(`${ROUTES.PROJECTS}.update`, projectId), formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            params: {
                _method: 'PUT',
                intent: IntentEnum.WEB_PROJECT_IMPORT_COMPONENT_PROGRESS_AND_MATERIAL,
            },
        });
    },
    importPanelsProgressRawMaterial: async (projectId: number, file: File, panelId: number) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('panel_id', panelId.toString());
        return await window.axios.post(route(`${ROUTES.PROJECTS}.update`, projectId), formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            params: {
                _method: 'PUT',
                intent: IntentEnum.WEB_PROJECT_IMPORT_PANEL_PROGRESS_AND_MATERIAL,
            },
        });
    },
};
