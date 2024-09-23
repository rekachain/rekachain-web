import { Resource } from '@/Support/interfaces/resources/Resource';
import { Panel } from '@/Support/models';
import { ProgressResource } from '@/Support/interfaces/resources/ProgressResource';

export interface PanelResource extends Resource, Panel {
    can_be_deleted: boolean;
    progress?: ProgressResource;
}
