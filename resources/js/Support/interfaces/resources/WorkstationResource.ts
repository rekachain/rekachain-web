import { Resource } from '@/Support/interfaces/resources/Resource';
import { Division, Workshop, Workstation } from '@/Support/models';

export interface WorkstationResource extends Resource, Workstation {
    workshop: Workshop;
    division: Division;
}
