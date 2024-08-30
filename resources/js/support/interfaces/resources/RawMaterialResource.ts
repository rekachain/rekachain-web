import { ComponentResource, PanelResource, Resource } from '@/support/interfaces/resources';
import { RawMaterial } from '@/support/models';

export interface RawMaterialResource extends Resource, RawMaterial {
    panels: PanelResource[];
    components: ComponentResource[];
}
