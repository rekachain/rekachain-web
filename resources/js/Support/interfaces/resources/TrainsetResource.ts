import { Resource } from '@/Support/interfaces/resources/Resource';
import { Trainset } from '@/Support/models';
import { CarriageResource, CarriageTrainsetResource } from '@/Support/interfaces/resources';

export interface TrainsetResource extends Resource, Trainset {
    // carriages_count: number;
    preset_name: string; // available only in intent: web.project.x
    carriage_trainsets: CarriageTrainsetResource[];
    carriages: CarriageResource[];
}
