import { ROUTES } from '@/Support/Constants/routes.js';
import { serviceFactory } from '@/Services/serviceFactory';
import { CarriageTrainsetResource, TrainsetResource } from '@/Support/Interfaces/Resources';
import { IntentEnum } from '@/Support/Enums/intentEnum';

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
    addCarriageTrainset: async (
        trainsetId: number,
        carriageId: number,
        carriageType: string,
        carriageDescription: string,
        carriageQty: number,
    ) => {
        await window.axios.post(
            route(`${ROUTES.TRAINSETS}.update`, trainsetId),
            {
                carriage_id: carriageId || null,
                carriage_type: carriageType,
                carriage_description: carriageDescription,
                carriage_qty: carriageQty,
            },
            {
                params: {
                    _method: 'PUT',
                    intent: IntentEnum.WEB_TRAINSET_ADD_CARRIAGE_TRAINSET,
                },
            },
        );
    },
    updateCarriageTrainset: async (
        trainsetId: number,
        carriageTrainsetId: number,
        data: Partial<CarriageTrainsetResource>,
    ) => {
        await window.axios.post(
            route(`${ROUTES.TRAINSETS}.update`, trainsetId),
            {
                carriage_trainset_id: carriageTrainsetId,
                ...data,
            },
            {
                params: {
                    _method: 'PUT',
                    intent: IntentEnum.WEB_TRAINSET_UPDATE_CARRIAGE_TRAINSET,
                },
            },
        );
    },
    generateTrainsetAttachments: async (
        trainsetId: number,
        sourceWorkstationId: number,
        destinationWorkstationId: number,
        division = 'assembly' as 'mechanic' | 'electric',
    ) => {
        const data = {
            mechanic: {
                mechanic_source_workstation_id: sourceWorkstationId,
                mechanic_destination_workstation_id: destinationWorkstationId,
            },
            electric: {
                electric_source_workstation_id: sourceWorkstationId,
                electric_destination_workstation_id: destinationWorkstationId,
            },
        };
        return window.axios.post(
            route(`${ROUTES.TRAINSETS}.update`, trainsetId),
            {
                division,
                ...data[division],
            },
            {
                params: {
                    _method: 'PUT',
                    intent: IntentEnum.WEB_TRAINSET_GENERATE_TRAINSET_ATTACHMENTS,
                },
            },
        );
    },
    generatePanelAttachments: async (
        trainsetId: number,
        sourceWorkstationId: number,
        destinationWorkstationId: number,
    ) => {
        return window.axios.post(
            route(`${ROUTES.TRAINSETS}.update`, trainsetId),
            {
                assembly_source_workstation_id: sourceWorkstationId,
                assembly_destination_workstation_id: destinationWorkstationId,
            },
            {
                params: {
                    _method: 'PUT',
                    intent: IntentEnum.WEB_TRAINSET_GENERATE_PANEL_ATTACHMENTS,
                },
            },
        );
    },
};
