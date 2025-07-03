import { ProductProblemStatusEnum } from '@/Support/Enums/productProblemStatusEnum';

export interface ProductProblemNote {
    id: number;
    product_problem_id: number;
    note: string;
    applied_status: ProductProblemStatusEnum;
    user_id: number;
    created_at: string;
    updated_at: string;
}
