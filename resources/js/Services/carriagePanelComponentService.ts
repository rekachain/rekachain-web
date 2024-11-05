import { ROUTES } from '@/Support/Constants/routes';
import { serviceFactory } from '@/Services/serviceFactory';
import { CarriagePanelComponentResource } from '@/Support/Interfaces/Resources';

export const carriagePanelComponentService = {
    ...serviceFactory<CarriagePanelComponentResource>(ROUTES.CARRIAGE_PANEL_COMPONENTS),
    customFunctionExample: async () => {
        console.log('custom function');
    },
};
