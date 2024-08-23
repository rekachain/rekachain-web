import { ROUTES } from '@/support/constants/routes.js';
import { serviceFactory } from '@/services/serviceFactory';
import { PresetTrainsetResource } from '@/support/interfaces/resources';

export const presetTrainsetService = {
    ...serviceFactory<PresetTrainsetResource>(ROUTES.PRESET_TRAINSETS),
};
