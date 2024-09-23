import { Resource } from '@/Support/Interfaces/Resources/Resource';
import { CarriagePreset } from '../Models';
import { CarriageResource } from '@/Support/Interfaces/Resources/CarriageResource';

export interface CarriagePresetResource extends Resource, CarriagePreset {
    carriage: CarriageResource;
}
