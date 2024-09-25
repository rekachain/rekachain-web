import { CarriagePresetResource, Resource } from '@/Support/Interfaces/Resources';
import { PresetTrainset } from '@/Support/Interfaces/Models';

export interface PresetTrainsetResource extends Resource, PresetTrainset {
    carriage_presets: CarriagePresetResource[];
    has_trainsets: boolean;
}
