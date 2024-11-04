import { ROUTES } from '@/Support/Constants/routes';
import { serviceFactory } from '@/Services/serviceFactory';
import { SerialPanelResource } from '@/Support/Interfaces/Resources';
import { IntentEnum } from '@/Support/Enums/intentEnum';

export const serialPanelService = {
    ...serviceFactory<SerialPanelResource>(ROUTES.SERIAL_PANELS),
    customFunctionExample: async () => {
        console.log('custom function');
    },
    downloadAllQrCodes: async (file: File) => {
        const formData = new FormData();
        formData.append('serial_panel', file);
        return await window.axios.get(route(`${ROUTES.SERIAL_PANELS}.show`), {
            params: {
                intent: IntentEnum.WEB_SERIAL_PANEL_DOWNLOAD_ALL_QR_CODES,
            },
        });
    },
};
