import { ROUTES } from '@/support/constants/routes.js';
import { serviceFactory } from '@/services/serviceFactory';
import { WorkshopResource } from '@/support/interfaces/resources/WorkshopResource';

export const workshopService = {
    ...serviceFactory<WorkshopResource>(ROUTES.WORKSHOPS),
};
