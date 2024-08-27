import { ROUTES } from '@/support/constants/routes.js';
import { serviceFactory } from '@/services/serviceFactory';
import { PanelResource } from '@/support/interfaces/resources';

export const panelService = {
    ...serviceFactory<PanelResource>(ROUTES.PANELS),
};
