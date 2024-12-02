import { serviceFactory } from '@/Services/serviceFactory';
import { ROUTES } from '@/Support/Constants/routes.js';
import { DivisionResource } from '@/Support/Interfaces/Resources';

export const divisionService = {
    ...serviceFactory<DivisionResource>(ROUTES.DIVISIONS),
};
