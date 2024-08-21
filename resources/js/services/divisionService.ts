import { ROUTES } from '@/support/constants/routes.js';
import { serviceFactory } from '@/services/serviceFactory';
import { DivisionResource } from '@/support/interfaces/resources';

export const divisionService = {
    ...serviceFactory<DivisionResource>(ROUTES.DIVISIONS),
};
