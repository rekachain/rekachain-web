import { CarriageResource, Resource } from '@/Support/Interfaces/Resources';
import { CarriagePreset } from '@/Support/Interfaces/Models';

export interface CarriagePresetResource extends Resource, CarriagePreset {
    carriage: CarriageResource;
}
