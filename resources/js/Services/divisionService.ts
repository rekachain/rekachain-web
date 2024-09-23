import { ROUTES } from '@/Support/Constants/routes.js';
import { serviceFactory } from '@/Services/serviceFactory';
import { DivisionResource } from '../Support/Interfaces/Resources';

export const divisionService = {
    ...serviceFactory<DivisionResource>(ROUTES.DIVISIONS),
};
