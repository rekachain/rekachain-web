import { ROUTES } from '@/Support/constants/routes';
import { serviceFactory } from '@/Services/serviceFactory';
import { SerialPanelResource } from '@/Support/interfaces/resources';

export const serialPanelService = {
    ...serviceFactory<SerialPanelResource>(ROUTES.SERIAL_PANELS),
    customFunctionExample: async () => {
        console.log('custom function');
    },
};
