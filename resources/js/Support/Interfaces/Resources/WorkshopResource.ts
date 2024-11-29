import { Workshop } from '@/Support/Interfaces/Models';
import { Resource } from '@/Support/Interfaces/Resources';

export interface WorkshopResource extends Resource, Workshop {
    can_be_deleted: boolean;
}
