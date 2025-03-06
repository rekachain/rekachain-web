export interface ReturnedProduct {
    id: number;
    product_returnable_id: number;
    product_returnable_type: string;
    buyer_id: number|null;
    qty: number;
    serial_number: number|null;
    created_at: string;
    updated_at: string;
}