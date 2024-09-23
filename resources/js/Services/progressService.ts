import { ROUTES } from '@/Support/constants/routes.js';
import { serviceFactory } from '@/Services/serviceFactory';
import { ProgressResource } from '@/Support/interfaces/resources';

export const progressService = {
    ...serviceFactory<ProgressResource>(ROUTES.PROGRESS),
};
