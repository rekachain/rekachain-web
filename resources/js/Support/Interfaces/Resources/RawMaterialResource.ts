import { ComponentResource, PanelResource, Resource } from '@/Support/Interfaces/Resources';
import { RawMaterial } from '@/Support/Interfaces/Models';

export interface RawMaterialResource extends Resource, RawMaterial {
    panels: PanelResource[];
    components: ComponentResource[];
    can_be_deleted: boolean;
    total_qty?: number; // available only in TrainsetAttachmentResource intent: WEB_TRAINSET_ATTACHMENT_GET_COMPONENT_MATERIALS_WITH_QTY
}
