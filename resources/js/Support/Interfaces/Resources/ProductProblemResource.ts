import { ProductProblem } from '@/Support/Interfaces/Models';
import {
    ComponentResource,
    ProductProblemNoteResource,
    Resource,
    ReturnedProductResource,
} from '@/Support/Interfaces/Resources';

export interface ProductProblemResource extends Resource, ProductProblem {
    returned_product?: ReturnedProductResource;
    component?: ComponentResource;
    localized_status: string;
    image: string;
    product_problem_notes?: ProductProblemNoteResource[];
    latest_product_problem_note?: ProductProblemNoteResource;
}
