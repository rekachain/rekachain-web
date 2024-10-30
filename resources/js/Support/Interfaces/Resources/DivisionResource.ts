import { Resource } from '@/Support/Interfaces/Resources';
import { Division } from '@/Support/Interfaces/Models';

export interface DivisionResource extends Resource, Division {
    can_be_deleted: boolean;
}
