import { serviceFactory } from '@/Services/serviceFactory';
import { ROUTES } from '@/Support/Constants/routes';
import { IntentEnum } from '@/Support/Enums/intentEnum';
import { ProductProblemResource } from '@/Support/Interfaces/Resources';

export const productProblemService = {
    ...serviceFactory<ProductProblemResource>(ROUTES.PRODUCT_PROBLEMS),
    updateWithNote: async (
        productProblemId: number,
        selectedStatus: string,
        image_path: any[],
        note: string | null,
    ) => {
        const formData = new FormData();
        formData.append('status', selectedStatus);
        image_path.length > 0 && formData.append('image_path', image_path[0]);
        note && formData.append('note', note ?? '');
        return await window.axios.post(
            route(`${ROUTES.PRODUCT_PROBLEMS}.update`, productProblemId),
            formData,
            {
                params: {
                    _method: 'PUT',
                    intent: IntentEnum.WEB_PRODUCT_PROBLEM_UPDATE_PRODUCT_PROBLEM_WITH_NOTE,
                },
            },
        );
    },
};
