import { Resource } from '@/Support/interfaces/resources/Resource';
import { CarriagePreset } from '@/Support/models';
import { CarriageResource } from '@/Support/interfaces/resources/CarriageResource';

export interface CarriagePresetResource extends Resource, CarriagePreset {
    carriage: CarriageResource;
}
