import { Resource } from '@/Support/Interfaces/Resources/Resource';
import { CarriagePanel } from '../Models';
import { PanelResource } from '';

export interface CarriagePanelResource extends Resource, CarriagePanel {
    panel: PanelResource;
}
