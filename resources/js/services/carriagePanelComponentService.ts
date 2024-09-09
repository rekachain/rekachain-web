import { ROUTES } from '@/support/constants/routes';
import { serviceFactory } from '@/services/serviceFactory';
import { CarriagePanelComponentResource } from '@/support/interfaces/resources';

export const carriagePanelComponentService = {
    ...serviceFactory<CarriagePanelComponentResource>(ROUTES.CARRIAGE_PANEL_COMPONENTS),
    customFunctionExample: async () => {
        console.log('custom function');
    },
};