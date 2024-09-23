import { ROUTES } from '@/Support/constants/routes.js';
import { serviceFactory } from '@/Services/serviceFactory';
import { RawMaterialResource } from '@/Support/interfaces/resources';
import { IntentEnum } from '@/Support/enums/intentEnum';

export const rawMaterialService = {
    ...serviceFactory<RawMaterialResource>(ROUTES.RAW_MATERIALS),
    downloadImportDataTemplate: async () => {
        const response = await window.axios.get(
            route(`${ROUTES.RAW_MATERIALS}.index`, {
                intent: IntentEnum.WEB_RAW_MATERIAL_GET_TEMPLATE_IMPORT_RAW_MATERIAL,
            }),
            { responseType: 'blob' },
        );

        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'rawMaterials.xlsx');
        document.body.appendChild(link);
        link.click();
        link.remove();
    },
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
