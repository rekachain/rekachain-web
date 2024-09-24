import { ComponentResource, PanelResource, Resource } from '';
import { RawMaterial } from '../Models';

export interface RawMaterialResource extends Resource, RawMaterial {
    panels: PanelResource[];
    components: ComponentResource[];
}
