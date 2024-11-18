import { ROUTES } from '@/Support/Constants/routes';
import { serviceFactory } from '@/Services/serviceFactory';
import { HelpdeskContactResource } from '@/Support/Interfaces/Resources';

export const helpdeskContactService = {
    ...serviceFactory<HelpdeskContactResource>(ROUTES.HELPDESK_CONTACT),
    customFunctionExample: async () => {
        console.log('custom function');
    },
};
