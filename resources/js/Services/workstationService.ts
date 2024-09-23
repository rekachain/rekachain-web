import { ROUTES } from '@/Support/constants/routes.js';
import { serviceFactory } from '@/Services/serviceFactory';
import { WorkstationResource } from '@/Support/interfaces/resources/WorkstationResource';

export const workstationService = {
    ...serviceFactory<WorkstationResource>(ROUTES.WORKSTATIONS),
};
