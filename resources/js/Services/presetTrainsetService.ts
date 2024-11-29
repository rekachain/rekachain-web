import { serviceFactory } from '@/Services/serviceFactory';
import { ROUTES } from '@/Support/Constants/routes.js';
import { PresetTrainsetResource } from '@/Support/Interfaces/Resources';

export const presetTrainsetService = {
    ...serviceFactory<PresetTrainsetResource>(ROUTES.PRESET_TRAINSETS),
};
