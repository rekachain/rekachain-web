import { ROUTES } from '@/Support/constants/routes.js';
import { serviceFactory } from '@/Services/serviceFactory';
import { CarriagePanelResource } from '@/Support/interfaces/resources';

export const carriagePanelService = {
    ...serviceFactory<CarriagePanelResource>(ROUTES.CARRIAGE_PANELS),
};
