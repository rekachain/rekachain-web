import { ROUTES } from '@/Support/Constants/routes';
import { serviceFactory } from '@/Services/serviceFactory';
import { SerialPanelResource } from '@/Support/Interfaces/Resources';

export const serialPanelService = {
    ...serviceFactory<SerialPanelResource>(ROUTES.SERIAL_PANELS),
    customFunctionExample: async () => {
        console.log('custom function');
    },
};
