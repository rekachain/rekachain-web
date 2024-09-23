import { Resource } from '@/Support/Interfaces/Resources/Resource';
import { Panel } from '../Models';
import { ProgressResource } from '@/Support/Interfaces/Resources/ProgressResource';

export interface PanelResource extends Resource, Panel {
    can_be_deleted: boolean;
    progress?: ProgressResource;
}
