import { ProgressResource, Resource } from '@/Support/Interfaces/Resources';
import { Panel } from '@/Support/Interfaces/Models';

export interface PanelResource extends Resource, Panel {
    can_be_deleted: boolean;
    progress?: ProgressResource;
}
