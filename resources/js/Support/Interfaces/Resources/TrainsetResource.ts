import { Resource } from '@/Support/Interfaces/Resources/Resource';
import { Trainset } from '../Models';
import { CarriageResource, CarriageTrainsetResource } from '';

export interface TrainsetResource extends Resource, Trainset {
    // carriages_count: number;
    preset_name: string; // available only in intent: web.project.x
    carriage_trainsets: CarriageTrainsetResource[];
    carriages: CarriageResource[];
}
