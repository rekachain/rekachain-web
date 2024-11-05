import { ROUTES } from '@/Support/Constants/routes.js';
import { serviceFactory } from '@/Services/serviceFactory';
import { CarriagePanelResource } from '@/Support/Interfaces/Resources';

export const carriagePanelService = {
    ...serviceFactory<CarriagePanelResource>(ROUTES.CARRIAGE_PANELS),
};
