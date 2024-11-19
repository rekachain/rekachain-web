import { RawMaterialResource, Resource } from '@/Support/Interfaces/Resources';
import { PanelMaterial } from '@/Support/Interfaces/Models';

export interface PanelMaterialResource extends Resource, PanelMaterial {
    raw_material: RawMaterialResource;
}
