import { ProductProblem } from '@/Support/Interfaces/Models';
import {
    ComponentResource,
    Resource,
    ReturnedProductResource,
} from '@/Support/Interfaces/Resources';

export interface ProductProblemResource extends Resource, ProductProblem {
    returned_product?: ReturnedProductResource;
    component?: ComponentResource;
    localized_status: string;
}
