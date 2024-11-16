import { ROUTES } from '@/Support/Constants/routes.js';
import { serviceFactory } from '@/Services/serviceFactory';
import { CarriagePanelResource } from '@/Support/Interfaces/Resources';
import { IntentEnum } from '@/Support/Enums/intentEnum';

export const carriagePanelService = {
    ...serviceFactory<CarriagePanelResource>(ROUTES.CARRIAGE_PANELS),
    addComponent: async (
        carriagePanelId: number,
        progressId: number,
        componentId: number | null,
        componentName: string,
        componentDescription: string,
        componentQty: number,
    ) => {
        await window.axios.post(
            route(`${ROUTES.CARRIAGE_PANELS}.update`, carriagePanelId),
            {
                component_progress_id: progressId,
                component_id: componentId,
                component_name: componentName,
                component_description: componentDescription,
                carriage_component_qty: componentQty,
            },
            {
                params: {
                    _method: 'PUT',
                    intent: IntentEnum.WEB_CARRIAGE_PANEL_ADD_COMPONENT,
                },
            },
        );
    },
    addRawMaterial: async (
        carriagePanelId: number,
        rawMaterialId: number | null,
        newRawMaterialCode: string,
        newRawMaterialDescription: string,
        newRawMaterialUnit: string,
        newRawMaterialSpecs: string,
        newRawMaterialQty: number,
    ) => {
        await window.axios.post(
            route(`${ROUTES.CARRIAGE_PANELS}.update`, carriagePanelId),
            {
                raw_material_id: rawMaterialId,
                new_raw_material_code: newRawMaterialCode,
                new_raw_material_description: newRawMaterialDescription,
                new_raw_material_unit: newRawMaterialUnit,
                new_raw_material_specs: newRawMaterialSpecs,
                new_raw_material_qty: newRawMaterialQty,
            },
            {
                params: {
                    _method: 'PUT',
                    intent: IntentEnum.WEB_CARRIAGE_PANEL_ADD_RAW_MATERIAL,
                },
            },
        );
    },
    changeProgress: async (
        carriagePanelId: number,
        progress_id: number | null,
        progress_name: string,
        progress_work_aspect_id: number | null,
    ) => {
        let formData = new FormData();

        if (progress_id) {
            formData.append('progress_id', progress_id.toString());
            formData.append('progress_name', '');
            formData.append('progress_work_aspect_id', '');
        } else {
            formData.append('progress_id', '');
            formData.append('progress_name', progress_name);
            formData.append('progress_work_aspect_id', progress_work_aspect_id!.toString());
        }

        await window.axios.post(route(`${ROUTES.CARRIAGE_PANELS}.update`, carriagePanelId), formData, {
            params: {
                _method: 'PUT',
                intent: IntentEnum.WEB_CARRIAGE_PANEL_CHANGE_PROGRESS,
            },
        });
    },
};
