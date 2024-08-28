import { Resource } from '@/support/interfaces/resources/Resource';
import { CarriagePanelResource, CarriageResource, TrainsetResource } from '@/support/interfaces/resources';
import { CarriageTrainset } from '@/support/models';

export interface CarriageTrainsetResource extends Resource, CarriageTrainset {
    trainset: TrainsetResource;
    carriage: CarriageResource;
    carriage_panels: CarriagePanelResource[];
    carriage_trainset: CarriageTrainsetResource;
}
