import { ProductRestockStatusEnum } from "@/Support/Enums/productRestockStatusEnum";

export interface ProductRestock {
    id: number;
    returned_product_id: number;
    product_restockable_id: number;
    product_restockable_type: string;
    project_id: number;
    status: ProductRestockStatusEnum;
    created_at: string;
    updated_at: string;
}