import { ReturnedProduct } from '@/Support/Interfaces/Models';
import {
    ComponentResource,
    PanelResource,
    ProductProblemResource,
    Resource,
    ReturnedProductNoteResource,
    SerialPanelResource,
    UserResource,
} from '@/Support/Interfaces/Resources';

export interface ReturnedProductResource extends Resource, ReturnedProduct {
    product_return?: ComponentResource | PanelResource;
    buyer?: UserResource;
    serial_panel?: SerialPanelResource;
    product_problems?: ProductProblemResource[];
    localized_status: string;
    image: string;
    returned_product_notes?: ReturnedProductNoteResource[];
    latest_returned_product_note?: ReturnedProductNoteResource;
    project_sub?: string;
}
