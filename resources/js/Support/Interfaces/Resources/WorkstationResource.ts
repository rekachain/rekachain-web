import { Division, Workshop, Workstation } from '@/Support/Interfaces/Models';
import { Resource } from '@/Support/Interfaces/Resources';

export interface WorkstationResource extends Resource, Workstation {
    workshop: Workshop;
    division: Division;
    can_be_deleted: boolean;
}
