import { ComponentResource, PanelResource, Resource } from '@/Support/Interfaces/Resources';
import { RawMaterial } from '@/Support/Interfaces/Models';

export interface RawMaterialResource extends Resource, RawMaterial {
    panels: PanelResource[];
    components: ComponentResource[];
}
