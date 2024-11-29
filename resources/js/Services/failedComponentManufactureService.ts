import { serviceFactory } from '@/Services/serviceFactory';
import { ROUTES } from '@/Support/Constants/routes';
import { FailedComponentManufactureResource } from '@/Support/Interfaces/Resources';

export const failedComponentManufactureService = {
    ...serviceFactory<FailedComponentManufactureResource>(ROUTES.FAILED_COMPONENT_MANUFACTURES),
    customFunctionExample: async () => {
        console.log('custom function');
    },
};
