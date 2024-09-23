import { ROUTES } from '@/Support/Constants/routes.js';
import { serviceFactory } from '@/Services/serviceFactory';
import { ProgressResource } from '../Support/Interfaces/Resources';

export const progressService = {
    ...serviceFactory<ProgressResource>(ROUTES.PROGRESS),
};
