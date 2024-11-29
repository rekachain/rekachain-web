import { PresetTrainset } from '@/Support/Interfaces/Models';
import { CarriagePresetResource, Resource } from '@/Support/Interfaces/Resources';

export interface PresetTrainsetResource extends Resource, PresetTrainset {
    carriage_presets: CarriagePresetResource[];
    has_trainsets: boolean;
}
