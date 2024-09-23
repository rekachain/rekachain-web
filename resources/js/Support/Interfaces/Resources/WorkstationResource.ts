import { Resource } from '@/Support/Interfaces/Resources/Resource';
import { Division, Workshop, Workstation } from '../Models';

export interface WorkstationResource extends Resource, Workstation {
    workshop: Workshop;
    division: Division;
}
