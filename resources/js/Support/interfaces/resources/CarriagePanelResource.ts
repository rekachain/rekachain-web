import { Resource } from '@/Support/interfaces/resources/Resource';
import { CarriagePanel } from '@/Support/models';
import { PanelResource } from '@/Support/interfaces/resources';

export interface CarriagePanelResource extends Resource, CarriagePanel {
    panel: PanelResource;
}
