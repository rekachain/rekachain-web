import { ROUTES } from '@/support/constants/routes';
import { serviceFactory } from '@/services/serviceFactory';
import { PanelMaterialResource } from '@/support/interfaces/resources';

export const panelMaterialService = {
    ...serviceFactory<PanelMaterialResource>(ROUTES.PANEL_MATERIALS),
    customFunctionExample: async () => {
        console.log('custom function');
    },
};