import { Resource } from '@/support/interfaces/resources/Resource';
import { Trainset } from '@/support/models';
import { CarriageResource } from '@/support/interfaces/resources/CarriageResource';
import { CarriageTrainsetPivotResource } from '@/support/interfaces/resources/pivots';

export interface TrainsetResource extends Resource, Trainset {
    // carriages_count: number;
    preset_name: string; // available only in intent: web.project.x
    carriage_trainsets: CarriageTrainsetPivotResource[];
}
