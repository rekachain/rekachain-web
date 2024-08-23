import { ROUTES } from '@/support/constants/routes.js';
import { serviceFactory } from '@/services/serviceFactory';
import { CarriagePresetResource } from '@/support/interfaces/resources';

export const carriagePresetService = {
    ...serviceFactory<CarriagePresetResource>(ROUTES.CARRIAGE_PRESETS),
};
