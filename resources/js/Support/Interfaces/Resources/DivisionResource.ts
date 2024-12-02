import { Division } from '@/Support/Interfaces/Models';
import { Resource } from '@/Support/Interfaces/Resources';

export interface DivisionResource extends Resource, Division {
    can_be_deleted: boolean;
}
