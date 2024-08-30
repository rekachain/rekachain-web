import { ROUTES } from '@/support/constants/routes.js';
import { serviceFactory } from '@/services/serviceFactory';
import { RawMaterialResource } from '@/support/interfaces/resources';

export const rawMaterialService = {
    ...serviceFactory<RawMaterialResource>(ROUTES.RAW_MATERIALS),
};
