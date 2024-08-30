import { Resource } from '@/support/interfaces/resources/Resource';
import { CarriagePanel } from '@/support/models';
import { PanelResource } from '@/support/interfaces/resources';

export interface CarriagePanelResource extends Resource, CarriagePanel {
    panel: PanelResource;
}
