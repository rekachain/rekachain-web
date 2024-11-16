import {
    CarriagePanelComponentResource,
    PanelAttachmentResource,
    PanelMaterialResource,
    PanelResource,
    ProgressResource,
    Resource,
} from '@/Support/Interfaces/Resources';
import { CarriagePanel } from '@/Support/Interfaces/Models';

export interface CarriagePanelResource extends Resource, CarriagePanel {
    panel: PanelResource;
    progress: ProgressResource;
    carriage_panel_components: CarriagePanelComponentResource[];
    panel_attachment: PanelAttachmentResource;
    panel_materials: PanelMaterialResource[];
}
