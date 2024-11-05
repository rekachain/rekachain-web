import { Resource } from '@/Support/Interfaces/Resources';
import { Division, Workshop, Workstation } from '@/Support/Interfaces/Models';

export interface WorkstationResource extends Resource, Workstation {
    workshop: Workshop;
    division: Division;
    can_be_deleted: boolean;
}
