import { ROUTES } from '@/support/constants/routes';
import { serviceFactory } from '@/services/serviceFactory';
import { SerialPanelResource } from '@/support/interfaces/resources';

export const serialPanelService = {
    ...serviceFactory<SerialPanelResource>(ROUTES.SERIAL_PANELS),
    customFunctionExample: async () => {
        console.log('custom function');
    },
};