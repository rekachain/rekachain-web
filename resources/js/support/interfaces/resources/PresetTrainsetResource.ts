import { Resource } from '@/support/interfaces/resources/Resource';
import { PresetTrainset } from '@/support/models';
import { CarriagePresetResource } from '@/support/interfaces/resources';

export interface PresetTrainsetResource extends Resource, PresetTrainset {
    carriage_presets: CarriagePresetResource[];
    has_trainsets: boolean;
}
