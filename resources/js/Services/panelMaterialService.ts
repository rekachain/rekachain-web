import { serviceFactory } from '@/Services/serviceFactory';
import { ROUTES } from '@/Support/Constants/routes';
import { PanelMaterialResource } from '@/Support/Interfaces/Resources';

export const panelMaterialService = {
    ...serviceFactory<PanelMaterialResource>(ROUTES.PANEL_MATERIALS),
    customFunctionExample: async () => {
        console.log('custom function');
    },
};
