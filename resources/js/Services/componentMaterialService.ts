import { ROUTES } from '@/Support/Constants/routes';
import { serviceFactory } from '@/Services/serviceFactory';
import { ComponentMaterialResource } from '@/Support/Interfaces/Resources';

export const componentMaterialService = {
    ...serviceFactory<ComponentMaterialResource>(ROUTES.COMPONENT_MATERIALS),
    customFunctionExample: async () => {
        console.log('custom function');
    },
};