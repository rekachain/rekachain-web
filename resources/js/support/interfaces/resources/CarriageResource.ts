import { Resource } from '@/support/interfaces/resources/Resource';
import { Carriage } from '@/support/models';

export interface CarriageResource extends Resource, Carriage {
    // trainset_id: number;
    qty?: number; // available only in intent: web.project.show.project
    // carriage_id: number;
}
