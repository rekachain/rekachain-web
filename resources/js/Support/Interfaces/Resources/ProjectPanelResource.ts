import { Project } from '@/Support/Interfaces/Models';
import { PanelResource, Resource } from '@/Support/Interfaces/Resources';

export interface ProjectPanelResource extends Resource, Project {
    panel: PanelResource;
    has_materials: boolean;
    total_qty: number;
}
