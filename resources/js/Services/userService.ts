import { serviceFactory } from '@/Services/serviceFactory';
import { ROUTES } from '@/Support/Constants/routes.js';
import { IntentEnum } from '@/Support/Enums/intentEnum';
import { UserResource } from '@/Support/Interfaces/Resources';

export const userService = {
    ...serviceFactory<UserResource>(ROUTES.USERS),
    softDelete: async (id: number) => {
        const url = route(`${ROUTES.USERS}.destroy`, id);
        await window.axios.delete(url, {
            params: {
                intent: IntentEnum.SOFT_DELETE_ENTRY,
            },
        });
    },
};
