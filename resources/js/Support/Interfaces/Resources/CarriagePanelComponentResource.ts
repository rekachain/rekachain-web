import {
    CarriagePanelResource,
    ComponentMaterialResource,
    ComponentResource,
    ProgressResource,
    Resource,
} from '@/Support/Interfaces/Resources';
import { CarriagePanelComponent } from '@/Support/Interfaces/Models';

export interface CarriagePanelComponentResource extends Resource, CarriagePanelComponent {
    component: ComponentResource;
    component_materials: ComponentMaterialResource[];
    carriage_panel: CarriagePanelResource;
    progress: ProgressResource;
}
