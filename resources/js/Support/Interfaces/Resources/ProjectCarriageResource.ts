import { CarriageResource, Resource } from '@/Support/Interfaces/Resources';
import { Project } from '@/Support/Interfaces/Models';

export interface ProjectCarriageResource extends Resource, Project {
    carriage: CarriageResource;
    total_qty: number;
}
