import { ROUTES } from '@/Support/Constants/routes';
import { serviceFactory } from '@/Services/serviceFactory';
import { ComponentResource } from '../Support/Interfaces/Resources';

export const componentService = {
    ...serviceFactory<ComponentResource>(ROUTES.COMPONENTS),
    downloadImportDataTemplate: async () => {
        //  NOTE: not implemented yet
        const response = await window.axios.get(
            route(`${ROUTES.COMPONENTS}.index`, {
                // intent: IntentEnum.WEB_COMPONENT_GET_TEMPLATE_IMPORT_COMPONENT,
            }),
            { responseType: 'blob' },
        );

        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'components.xlsx');
        document.body.appendChild(link);
        link.click();
        link.remove();
    }
};
