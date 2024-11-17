import { ComponentMaterial } from '@/Support/Interfaces/Models';
import { RawMaterialResource, Resource } from '@/Support/Interfaces/Resources';

export interface ComponentMaterialResource extends Resource, ComponentMaterial {
    raw_material: RawMaterialResource;
}
