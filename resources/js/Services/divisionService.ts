import { ROUTES } from '@/Support/constants/routes.js';
import { serviceFactory } from '@/Services/serviceFactory';
import { DivisionResource } from '@/Support/interfaces/resources';

export const divisionService = {
    ...serviceFactory<DivisionResource>(ROUTES.DIVISIONS),
};
