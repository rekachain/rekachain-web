import { serviceFactory } from '@/Services/serviceFactory';
import { ROUTES } from '@/Support/Constants/routes';
import { HelpdeskContactResource } from '@/Support/Interfaces/Resources';

export const helpdeskContactService = {
    ...serviceFactory<HelpdeskContactResource>(ROUTES.HELPDESK_CONTACT),
    customFunctionExample: async () => {
        console.log('custom function');
    },
};
