import { ROUTES } from '@/Support/Constants/routes.js';
import { serviceFactory } from '@/Services/serviceFactory';
import { WorkshopResource } from '@/Support/Interfaces/Resources/WorkshopResource';

export const workshopService = {
    ...serviceFactory<WorkshopResource>(ROUTES.WORKSHOPS),
};
