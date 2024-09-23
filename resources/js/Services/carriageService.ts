import { ROUTES } from '@/Support/constants/routes.js';
import { serviceFactory } from '@/Services/serviceFactory';
import { CarriageResource } from '@/Support/interfaces/resources';
import { IntentEnum } from '@/Support/enums/intentEnum';

export const carriageService = {
    ...serviceFactory<CarriageResource>(ROUTES.CARRIAGES),
    importData: async (file: File) => {
        const formData = new FormData();
        formData.append('import_file', file);
        return await window.axios.post(route(`${ROUTES.CARRIAGES}.store`), formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            params: {
                intent: IntentEnum.WEB_CARRIAGE_IMPORT_CARRIAGE,
            },
        });
    },
};
