import { Resource } from '@/support/interfaces/resources/Resource';
import { Division, Workshop, Workstation } from '@/support/models';

export interface WorkstationResource extends Resource, Workstation {
    workshop: Workshop;
    division: Division;
}
