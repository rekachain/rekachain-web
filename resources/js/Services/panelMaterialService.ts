import { ROUTES } from '@/Support/constants/routes';
import { serviceFactory } from '@/Services/serviceFactory';
import { PanelMaterialResource } from '@/Support/interfaces/resources';

export const panelMaterialService = {
    ...serviceFactory<PanelMaterialResource>(ROUTES.PANEL_MATERIALS),
    customFunctionExample: async () => {
        console.log('custom function');
    },
};
