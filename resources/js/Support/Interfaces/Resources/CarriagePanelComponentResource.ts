import { ComponentResource, Resource } from '@/Support/Interfaces/Resources';
import { CarriagePanelComponent } from '@/Support/Interfaces/Models';

export interface CarriagePanelComponentResource extends Resource, CarriagePanelComponent {
    component: ComponentResource;
}
