import {
    CarriagePanelResource,
    CarriageResource,
    Resource,
    TrainsetResource,
} from '@/Support/Interfaces/Resources';
import { CarriageTrainset } from '@/Support/Interfaces/Models';

export interface CarriageTrainsetResource extends Resource, CarriageTrainset {
    trainset: TrainsetResource;
    carriage: CarriageResource;
    carriage_panels: CarriagePanelResource[];
    carriage_trainset: CarriageTrainsetResource;
}
