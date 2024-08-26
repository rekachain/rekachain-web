import { ROUTES } from '@/support/constants/routes.js';
import { serviceFactory } from '@/services/serviceFactory';
import { CarriageResource } from '@/support/interfaces/resources';

export const carriageService = {
    ...serviceFactory<CarriageResource>(ROUTES.CARRIAGES),
};
