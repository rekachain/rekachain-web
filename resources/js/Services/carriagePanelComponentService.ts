import { ROUTES } from '@/Support/constants/routes';
import { serviceFactory } from '@/Services/serviceFactory';
import { CarriagePanelComponentResource } from '@/Support/interfaces/resources';

export const carriagePanelComponentService = {
    ...serviceFactory<CarriagePanelComponentResource>(ROUTES.CARRIAGE_PANEL_COMPONENTS),
    customFunctionExample: async () => {
        console.log('custom function');
    },
};
