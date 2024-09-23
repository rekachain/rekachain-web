import { ROUTES } from '@/Support/constants/routes.js';
import { serviceFactory } from '@/Services/serviceFactory';
import { PresetTrainsetResource } from '@/Support/interfaces/resources';

export const presetTrainsetService = {
    ...serviceFactory<PresetTrainsetResource>(ROUTES.PRESET_TRAINSETS),
};
