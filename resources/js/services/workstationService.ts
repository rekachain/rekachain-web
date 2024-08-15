import { ROUTES } from '@/support/constants/routes.js';
import { serviceFactory } from '@/services/serviceFactory';
import { WorkstationResource } from '@/support/interfaces/resources/WorkstationResource';

export const workstationService = {
    ...serviceFactory<WorkstationResource>(ROUTES.WORKSTATIONS),
};
