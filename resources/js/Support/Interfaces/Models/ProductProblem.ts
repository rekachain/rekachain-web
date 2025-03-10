import { ProductProblemStatusEnum } from "@/Support/Enums/productProblemStatusEnum";

export interface ProductProblem {
    id: number;
    returned_product_id: number;
    component_id: number;
    status: ProductProblemStatusEnum;
    created_at: string;
    updated_at: string;
}