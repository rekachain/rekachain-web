import { ROUTES } from '@/Support/constants/routes.js';
import { serviceFactory } from '@/Services/serviceFactory';
import { WorkshopResource } from '@/Support/interfaces/resources/WorkshopResource';

export const workshopService = {
    ...serviceFactory<WorkshopResource>(ROUTES.WORKSHOPS),
};
