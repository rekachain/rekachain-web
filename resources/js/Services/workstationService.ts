import { ROUTES } from '@/Support/Constants/routes.js';
import { serviceFactory } from '@/Services/serviceFactory';
import { WorkstationResource } from '@/Support/Interfaces/Resources/WorkstationResource';

export const workstationService = {
    ...serviceFactory<WorkstationResource>(ROUTES.WORKSTATIONS),
};
