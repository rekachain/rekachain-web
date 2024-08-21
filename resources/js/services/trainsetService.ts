import { ROUTES } from '@/support/constants/routes.js';
import { serviceFactory } from '@/services/serviceFactory';
import { TrainsetResource } from '@/support/interfaces/resources';

export const trainsetService = {
    ...serviceFactory<TrainsetResource>(ROUTES.TRAINSETS),
};
