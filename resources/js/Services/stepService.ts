import { ROUTES } from '@/Support/Constants/routes';
import { serviceFactory } from '@/Services/serviceFactory';
import { StepResource } from '@/Support/Interfaces/Resources';
import { IntentEnum } from '@/Support/Enums/intentEnum';

export const stepService = {
    ...serviceFactory<StepResource>(ROUTES.STEPS),
    downloadImportDataTemplate: async () => {
        const response = await window.axios.get(
            route(`${ROUTES.STEPS}.index`, {
                intent: IntentEnum.WEB_STEP_GET_TEMPLATE_IMPORT_STEP,
            }),
            { responseType: 'blob' },
        );

        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'steps.xlsx');
        document.body.appendChild(link);
        link.click();
        link.remove();
    },
    importData: async (file: File) => {
        const formData = new FormData();
        formData.append('import_file', file);
        return await window.axios.post(route(`${ROUTES.STEPS}.store`), formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            params: {
                intent: IntentEnum.WEB_STEP_IMPORT_STEP,
            },
        });
    },
};
