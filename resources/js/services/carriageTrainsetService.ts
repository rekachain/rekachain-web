import { ROUTES } from '@/support/constants/routes.js';
import { serviceFactory } from '@/services/serviceFactory';
import { CarriageTrainsetResource } from '@/support/interfaces/resources';
import { IntentEnum } from '@/support/enums/intentEnum';

export const carriageTrainsetService = {
    ...serviceFactory<CarriageTrainsetResource>(ROUTES.CARRIAGE_TRAINSETS),
    addPanel: async (
        carriageId: number,
        progressId: number,
        panelId: number,
        panelName: string,
        panelDescription: string,
        panelQty: number,
    ) => {
        return console.log({
            carriage_panel_progress_id: progressId,
            panel_id: panelId || null,
            panel_name: panelName,
            panel_description: panelDescription,
            carriage_panel_qty: panelQty,
        });
        await window.axios.post(
            route(`${ROUTES.CARRIAGE_TRAINSETS}.update`, carriageId),
            {
                carriage_panel_progress_id: progressId,
                panel_id: panelId || null,
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
