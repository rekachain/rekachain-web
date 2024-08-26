import { Resource } from '@/support/interfaces/resources/Resource';
import { CarriagePreset } from '@/support/models';
import { CarriageResource } from '@/support/interfaces/resources/CarriageResource';

export interface CarriagePresetResource extends Resource, CarriagePreset {
    carriage: CarriageResource;
}
