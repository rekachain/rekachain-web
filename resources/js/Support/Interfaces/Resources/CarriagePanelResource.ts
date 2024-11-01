import { CarriagePanelComponentResource, PanelResource, ProgressResource, Resource } from '@/Support/Interfaces/Resources';
import { CarriagePanel } from '@/Support/Interfaces/Models';

export interface CarriagePanelResource extends Resource, CarriagePanel {
    panel: PanelResource;
    progress: ProgressResource;
    carriage_panel_components: CarriagePanelComponentResource[];
}
