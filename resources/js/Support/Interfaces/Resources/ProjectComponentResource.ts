import { ComponentResource, Resource, TrainsetResource } from '@/Support/Interfaces/Resources';
import { Project } from '@/Support/Interfaces/Models';

export interface ProjectComponentResource extends Resource, Project {
    component: ComponentResource;
    total_qty: number;
}
