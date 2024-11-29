import { PanelMaterial } from '@/Support/Interfaces/Models';
import { RawMaterialResource, Resource } from '@/Support/Interfaces/Resources';

export interface PanelMaterialResource extends Resource, PanelMaterial {
    raw_material: RawMaterialResource;
}
