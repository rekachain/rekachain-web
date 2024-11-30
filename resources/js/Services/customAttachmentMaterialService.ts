import { serviceFactory } from '@/Services/serviceFactory';
import { ROUTES } from '@/Support/Constants/routes';
import { CustomAttachmentMaterialResource } from '@/Support/Interfaces/Resources';

export const customAttachmentMaterialService = {
    ...serviceFactory<CustomAttachmentMaterialResource>(ROUTES.CUSTOM_ATTACHMENT_MATERIALS),
    customFunctionExample: async () => {
        console.log('custom function');
    },
};
