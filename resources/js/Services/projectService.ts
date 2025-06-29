import { serviceFactory } from '@/Services/serviceFactory';
import { ROUTES } from '@/Support/Constants/routes.js';
import { IntentEnum } from '@/Support/Enums/intentEnum';
import { PaginateResponse } from '@/Support/Interfaces/Others';
import { ServiceFilterOptions } from '@/Support/Interfaces/Others/ServiceFilterOptions';
import {
    ProjectCarriageResource,
    ProjectPanelResource,
    ProjectResource,
} from '@/Support/Interfaces/Resources';
import { ProjectComponentResource } from '@/Support/Interfaces/Resources/ProjectComponentResource';
import { ProjectImportProgressMaterialOverride } from '@/Support/Interfaces/Types';
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
    importProject: async (file: File, buyer_id: number | null) => {
        const formData = new FormData();
        formData.append('file', file);
        if (buyer_id) {
            formData.append('buyer_id', buyer_id.toString());
        }
        return await window.axios.post(route(`${ROUTES.PROJECTS}.store`), formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            params: {
                intent: IntentEnum.WEB_PROJECT_IMPORT_PROJECT_TEMPLATE,
            },
        });
    },
    getCarriages: async (
        projectId: number,
        filters: ServiceFilterOptions = {},
        config: AxiosRequestConfig = {},
    ): Promise<PaginateResponse<ProjectCarriageResource>> => {
        const response = await window.axios.get(route(`${ROUTES.PROJECTS}.show`, projectId), {
            params: {
                intent: IntentEnum.WEB_PROJECT_GET_ALL_CARRIAGES_WITH_QTY,
                ...filters,
                ...config,
            },
        });
        return response.data;
    },
    getQtyComponents: async (
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
    getCarriageComponents: async (
        projectId: number,
        carriageId: number,
        filters: ServiceFilterOptions = {},
        config: AxiosRequestConfig = {},
    ): Promise<PaginateResponse<ProjectComponentResource>> => {
        const response = await window.axios.get(
            route(`${ROUTES.PROJECTS_CARRIAGES}.show`, [projectId, carriageId]),
            {
                params: {
                    intent: IntentEnum.WEB_PROJECT_GET_ALL_CARRIAGE_COMPONENTS_WITH_QTY,
                    ...filters,
                    ...config,
                },
            },
        );
        return response.data;
    },
    getTrainsetComponents: async (
        projectId: number,
        trainsetId: number,
        filters: ServiceFilterOptions = {},
        config: AxiosRequestConfig = {},
    ): Promise<PaginateResponse<ProjectComponentResource>> => {
        const response = await window.axios.get(
            route(`${ROUTES.PROJECTS_TRAINSETS}.show`, [projectId, trainsetId]),
            {
                params: {
                    intent: IntentEnum.WEB_PROJECT_GET_ALL_TRAINSET_COMPONENTS_WITH_QTY,
                    ...filters,
                    ...config,
                },
            },
        );
        return response.data;
    },
    getQtyPanels: async (
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
    getCarriagePanels: async (
        projectId: number,
        carriageId: number,
        filters: ServiceFilterOptions = {},
        config: AxiosRequestConfig = {},
    ): Promise<PaginateResponse<ProjectPanelResource>> => {
        const response = await window.axios.get(
            route(`${ROUTES.PROJECTS_CARRIAGES}.show`, [projectId, carriageId]),
            {
                params: {
                    intent: IntentEnum.WEB_PROJECT_GET_ALL_CARRIAGE_PANELS_WITH_QTY,
                    ...filters,
                    ...config,
                },
            },
        );
        return response.data;
    },
    getTrainsetPanels: async (
        projectId: number,
        trainsetId: number,
        filters: ServiceFilterOptions = {},
        config: AxiosRequestConfig = {},
    ): Promise<PaginateResponse<ProjectPanelResource>> => {
        const response = await window.axios.get(
            route(`${ROUTES.PROJECTS_TRAINSETS}.show`, [projectId, trainsetId]),
            {
                params: {
                    intent: IntentEnum.WEB_PROJECT_GET_ALL_TRAINSET_PANELS_WITH_QTY,
                    ...filters,
                    ...config,
                },
            },
        );
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
    importTrainsetComponentsProgressRawMaterial: async (
        projectId: number,
        trainsetId: number,
        file: File,
        componentId: number,
        workAspectId: number,
    ) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('component_id', componentId.toString());
        formData.append('work_aspect_id', workAspectId.toString());
        return await window.axios.post(
            route(`${ROUTES.PROJECTS_TRAINSETS}.update`, [projectId, trainsetId]),
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                params: {
                    _method: 'PUT',
                    intent: IntentEnum.WEB_PROJECT_IMPORT_TRAINSET_COMPONENT_PROGRESS_AND_MATERIAL,
                },
            },
        );
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
    importTrainsetPanelsProgressRawMaterial: async (
        projectId: number,
        trainsetId: number,
        file: File,
        panelId: number,
    ) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('panel_id', panelId.toString());
        return await window.axios.post(
            route(`${ROUTES.PROJECTS_TRAINSETS}.update`, [projectId, trainsetId]),
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                params: {
                    _method: 'PUT',
                    intent: IntentEnum.WEB_PROJECT_IMPORT_TRAINSET_PANEL_PROGRESS_AND_MATERIAL,
                },
            },
        );
    },
    importCarriageComponentsProgressRawMaterial: async (
        projectId: number,
        carriageId: number,
        file: File,
        componentId: number,
        workAspectId: number,
        override: ProjectImportProgressMaterialOverride,
    ) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('component_id', componentId.toString());
        formData.append('work_aspect_id', workAspectId.toString());

        if (override !== 'default') {
            formData.append('override', override === 'override' ? '1' : '0');
        }

        return await window.axios.post(
            route(`${ROUTES.PROJECTS_CARRIAGES}.update`, [projectId, carriageId]),
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                params: {
                    _method: 'PUT',
                    intent: IntentEnum.WEB_PROJECT_IMPORT_CARRIAGE_COMPONENT_PROGRESS_AND_MATERIAL,
                },
            },
        );
    },
    importCarriagePanelsProgressRawMaterial: async (
        projectId: number,
        carriageId: number,
        file: File,
        panelId: number,
    ) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('panel_id', panelId.toString());
        return await window.axios.post(
            route(`${ROUTES.PROJECTS_CARRIAGES}.update`, [projectId, carriageId]),
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                params: {
                    _method: 'PUT',
                    intent: IntentEnum.WEB_PROJECT_IMPORT_CARRIAGE_PANEL_PROGRESS_AND_MATERIAL,
                },
            },
        );
    },
};
