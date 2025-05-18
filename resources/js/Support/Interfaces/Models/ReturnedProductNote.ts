import { ReturnedProductStatusEnum } from "@/Support/Enums/returnedProductStatusEnum";

export interface ReturnedProductNote {
    id: number;
    returned_product_id: number;
    note: string;
    applied_status: ReturnedProductStatusEnum;
    user_id: number;
    created_at: string;
    updated_at: string;
}
