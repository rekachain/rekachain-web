import { ReturnedProductStatusEnum } from '@/Support/Enums/returnedProductStatusEnum';

export interface ReturnedProduct {
    id: number;
    product_returnable_id: number;
    product_returnable_type: string;
    buyer_id: number | null;
    qty: number;
    serial_panel_id: number | null;
    serial_number: number | null;
    status: ReturnedProductStatusEnum;
    created_at: string;
    updated_at: string;
}
