import { Project } from '@/Support/Interfaces/Models';
import { ComponentResource, Resource } from '@/Support/Interfaces/Resources';

export interface ProjectComponentResource extends Resource, Project {
    component: ComponentResource;
    has_materials: boolean;
    total_qty: number;
}
