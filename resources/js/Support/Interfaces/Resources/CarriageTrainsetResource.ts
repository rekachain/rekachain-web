import { Resource } from '@/Support/Interfaces/Resources/Resource';
import { CarriagePanelResource, CarriageResource, TrainsetResource } from '';
import { CarriageTrainset } from '../Models';

export interface CarriageTrainsetResource extends Resource, CarriageTrainset {
    trainset: TrainsetResource;
    carriage: CarriageResource;
    carriage_panels: CarriagePanelResource[];
    carriage_trainset: CarriageTrainsetResource;
}
