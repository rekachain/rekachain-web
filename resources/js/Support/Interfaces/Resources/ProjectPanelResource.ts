import { PanelResource, Resource, } from '@/Support/Interfaces/Resources';
import { Project } from '@/Support/Interfaces/Models';

export interface ProjectPanelResource extends Resource, Project {
    panel: PanelResource;
    total_qty: number;
}