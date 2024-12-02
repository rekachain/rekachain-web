import { Project } from '@/Support/Interfaces/Models';
import { CarriageResource, Resource } from '@/Support/Interfaces/Resources';

export interface ProjectCarriageResource extends Resource, Project {
    carriage: CarriageResource;
    total_qty: number;
}
