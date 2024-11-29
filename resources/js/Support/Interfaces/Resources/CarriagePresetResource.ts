import { CarriagePreset } from '@/Support/Interfaces/Models';
import { CarriageResource, Resource } from '@/Support/Interfaces/Resources';

export interface CarriagePresetResource extends Resource, CarriagePreset {
    carriage: CarriageResource;
}
