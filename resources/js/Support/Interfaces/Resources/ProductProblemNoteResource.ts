import { ProductProblemNote } from '@/Support/Interfaces/Models';
import { ProductProblemResource, Resource, UserResource } from '@/Support/Interfaces/Resources';

export interface ProductProblemNoteResource extends Resource, ProductProblemNote {
    product_problem?: ProductProblemResource;
    user?: UserResource;
    localized_applied_status: string;
}
