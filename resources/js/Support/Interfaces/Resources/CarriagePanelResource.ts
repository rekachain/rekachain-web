import { PanelResource, Resource } from '@/Support/Interfaces/Resources';
import { CarriagePanel } from '@/Support/Interfaces/Models';

export interface CarriagePanelResource extends Resource, CarriagePanel {
    panel: PanelResource;
}
