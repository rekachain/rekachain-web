import { ProductProblemCauseEnum } from '@/Support/Enums/productProblemCauseEnum';
import { ProductProblemStatusEnum } from '@/Support/Enums/productProblemStatusEnum';

export interface ProductProblem {
    id: number;
    returned_product_id: number;
    component_id: number;
    cause: ProductProblemCauseEnum;
    status: ProductProblemStatusEnum;
    image_path: string;
    created_at: string;
    updated_at: string;
}
