import { ReturnedProductNote } from '@/Support/Interfaces/Models';
import { Resource, ReturnedProductResource, UserResource } from '@/Support/Interfaces/Resources';

export interface ReturnedProductNoteResource extends Resource, ReturnedProductNote {
    returned_product?: ReturnedProductResource;
    user?: UserResource;
    localized_applied_status: string;
    can_be_updated: boolean;
}
