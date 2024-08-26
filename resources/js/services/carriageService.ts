import { ROUTES } from '@/support/constants/routes.js';
import { serviceFactory } from '@/services/serviceFactory';
import { CarriageResource } from '@/support/interfaces/resources';
import { IntentEnum } from '@/support/enums/intentEnum';

export const carriageService = {
    ...serviceFactory<CarriageResource>(ROUTES.CARRIAGES),
    addPanel: async (
        carriageId: number,
        progressId: number,
        panelId: number,
        panelName: string,
        panelDescription: string,
        panelQty: number,
    ) => {
        await window.axios.post(
            route(`${ROUTES.CARRIAGES}.update`, carriageId),
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
                    intent: IntentEnum.WEB_CARRIAGE_ADD_CARRIAGE_PANEL,
                },
            },
        );
    },
};
