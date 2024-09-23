import { Resource } from '@/Support/interfaces/resources/Resource';
import { CarriagePanelResource, CarriageResource, TrainsetResource } from '@/Support/interfaces/resources';
import { CarriageTrainset } from '@/Support/models';

export interface CarriageTrainsetResource extends Resource, CarriageTrainset {
    trainset: TrainsetResource;
    carriage: CarriageResource;
    carriage_panels: CarriagePanelResource[];
    carriage_trainset: CarriageTrainsetResource;
}
