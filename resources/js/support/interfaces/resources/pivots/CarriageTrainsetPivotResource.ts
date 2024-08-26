import { Resource } from '@/support/interfaces/resources/Resource';
import { Carriage } from '@/support/models';
import { PanelResource } from '@/support/interfaces/resources';

export interface CarriageTrainsetPivotResource extends Resource {
    qty: number;
    trainset_id: number;
    carriage_id: number;
}
