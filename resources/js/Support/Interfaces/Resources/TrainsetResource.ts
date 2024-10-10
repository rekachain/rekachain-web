import { CarriageResource, CarriageTrainsetResource, Resource } from '@/Support/Interfaces/Resources';
import { Trainset } from '@/Support/Interfaces/Models';

export interface TrainsetResource extends Resource, Trainset {
    // carriages_count: number;
    preset_name: string; // available only in intent: web.project.x
    carriage_trainsets: CarriageTrainsetResource[];
    carriages: CarriageResource[];
    can_be_deleted: boolean;
}
