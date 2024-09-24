import { Resource } from '@/Support/Interfaces/Resources/Resource';
import { PresetTrainset } from '../Models';
import { CarriagePresetResource } from '';

export interface PresetTrainsetResource extends Resource, PresetTrainset {
    carriage_presets: CarriagePresetResource[];
    has_trainsets: boolean;
}
