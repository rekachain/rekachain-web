import { Resource } from '@/Support/interfaces/resources/Resource';
import { PresetTrainset } from '@/Support/models';
import { CarriagePresetResource } from '@/Support/interfaces/resources';

export interface PresetTrainsetResource extends Resource, PresetTrainset {
    carriage_presets: CarriagePresetResource[];
    has_trainsets: boolean;
}
