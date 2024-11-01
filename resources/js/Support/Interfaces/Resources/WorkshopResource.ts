import { Resource } from '@/Support/Interfaces/Resources';
import { Workshop } from '@/Support/Interfaces/Models';

export interface WorkshopResource extends Resource, Workshop {
    can_be_deleted: boolean;
}
