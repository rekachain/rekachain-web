import { ROUTES } from '@/support/constants/routes.js';
import { serviceFactory } from '@/services/serviceFactory';
import { ProgressResource } from '@/support/interfaces/resources';

export const progressService = {
    ...serviceFactory<ProgressResource>(ROUTES.PROGRESS),
};
