import { Resource } from '@/support/interfaces/resources/Resource';
import { Panel } from '@/support/models';
import { ProgressResource } from '@/support/interfaces/resources/ProgressResource';

export interface PanelResource extends Resource, Panel {
    can_be_deleted: boolean;
    progress?: ProgressResource;
}
