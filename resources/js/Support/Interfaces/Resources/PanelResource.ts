import { Panel } from '@/Support/Interfaces/Models';
import { ProgressResource, Resource } from '@/Support/Interfaces/Resources';

export interface PanelResource extends Resource, Panel {
    can_be_deleted: boolean;
    progress?: ProgressResource;
}
