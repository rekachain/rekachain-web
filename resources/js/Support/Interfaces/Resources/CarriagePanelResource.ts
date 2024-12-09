import { CarriagePanel } from '@/Support/Interfaces/Models';
import {
    CarriagePanelComponentResource,
    CarriageTrainsetResource,
    PanelAttachmentResource,
    PanelMaterialResource,
    PanelResource,
    ProgressResource,
    Resource,
} from '@/Support/Interfaces/Resources';

export interface CarriagePanelResource extends Resource, CarriagePanel {
    panel: PanelResource;
    progress: ProgressResource;
    carriage_trainset?: CarriageTrainsetResource;
    carriage_panel_components: CarriagePanelComponentResource[];
    panel_attachments: PanelAttachmentResource[];
    panel_materials: PanelMaterialResource[];
}
