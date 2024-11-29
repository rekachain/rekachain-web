import { serviceFactory } from '@/Services/serviceFactory';
import { ROUTES } from '@/Support/Constants/routes.js';
import { IntentEnum } from '@/Support/Enums/intentEnum';
import { CarriageTrainsetResource } from '@/Support/Interfaces/Resources';

export const carriageTrainsetService = {
    ...serviceFactory<CarriageTrainsetResource>(ROUTES.CARRIAGE_TRAINSETS),
    addPanel: async (
        carriageId: number,
        progressId: number,
        panelId: number | null,
        panelName: string,
        panelDescription: string,
        panelQty: number,
    ) => {
        await window.axios.post(
            route(`${ROUTES.CARRIAGE_TRAINSETS}.update`, carriageId),
            {
                carriage_panel_progress_id: progressId,
                panel_id: panelId,
                panel_name: panelName,
                panel_description: panelDescription,
                carriage_panel_qty: panelQty,
            },
            {
                params: {
                    _method: 'PUT',
                    intent: IntentEnum.WEB_CARRIAGE_TRAINSET_ADD_CARRIAGE_PANEL,
                },
            },
        );
    },
};
