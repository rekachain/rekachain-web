import { ROUTES } from '@/Support/Constants/routes.js';
import { serviceFactory } from '@/Services/serviceFactory';
import { UserResource } from '@/Support/Interfaces/Resources';
import { IntentEnum } from '@/Support/Enums/intentEnum';

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
