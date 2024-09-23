import { ROUTES } from '@/Support/constants/routes.js';
import { serviceFactory } from '@/Services/serviceFactory';
import { CarriagePresetResource } from '@/Support/interfaces/resources';

export const carriagePresetService = {
    ...serviceFactory<CarriagePresetResource>(ROUTES.CARRIAGE_PRESETS),
};
