import { serviceFactory } from '@/Services/serviceFactory';
import { ROUTES } from '@/Support/Constants/routes.js';
import { CarriagePresetResource } from '@/Support/Interfaces/Resources';

export const carriagePresetService = {
    ...serviceFactory<CarriagePresetResource>(ROUTES.CARRIAGE_PRESETS),
};
