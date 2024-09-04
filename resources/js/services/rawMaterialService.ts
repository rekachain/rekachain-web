import { ROUTES } from '@/support/constants/routes.js';
import { serviceFactory } from '@/services/serviceFactory';
import { RawMaterialResource } from '@/support/interfaces/resources';
import { IntentEnum } from '@/support/enums/intentEnum';

export const rawMaterialService = {
    ...serviceFactory<RawMaterialResource>(ROUTES.RAW_MATERIALS),
    importData: async (file: File) => {
        const formData = new FormData();
        formData.append('import_file', file);
        return await window.axios.post(route(`${ROUTES.RAW_MATERIALS}.store`), formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            params: {
                intent: IntentEnum.WEB_RAW_MATERIAL_IMPORT_RAW_MATERIAL,
            },
        });
    },
};
