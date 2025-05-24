import { ProductRestock } from '@/Support/Interfaces/Models';
import {
    ComponentResource,
    PanelResource,
    ProjectResource,
    Resource,
    ReturnedProductResource,
} from '@/Support/Interfaces/Resources';

export interface ProductRestockResource extends Resource, ProductRestock {
    returned_product?: ReturnedProductResource;
    product_restockable?: ComponentResource | PanelResource;
    project?: ProjectResource;
    project_url?: string;
    localized_status: string;
}
