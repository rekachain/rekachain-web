import { CarriagePanel } from '@/Support/Interfaces/Models';
import {
    CarriagePanelComponentResource,
    PanelAttachmentResource,
    PanelMaterialResource,
    PanelResource,
    ProgressResource,
    Resource,
} from '@/Support/Interfaces/Resources';

export interface CarriagePanelResource extends Resource, CarriagePanel {
    panel: PanelResource;
    progress: ProgressResource;
    carriage_panel_components: CarriagePanelComponentResource[];
    panel_attachments: PanelAttachmentResource[];
    panel_materials: PanelMaterialResource[];
}
