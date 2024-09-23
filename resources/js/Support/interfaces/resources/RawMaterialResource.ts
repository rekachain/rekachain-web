import { ComponentResource, PanelResource, Resource } from '@/Support/interfaces/resources';
import { RawMaterial } from '@/Support/models';

export interface RawMaterialResource extends Resource, RawMaterial {
    panels: PanelResource[];
    components: ComponentResource[];
}
