import { CarriagePanelComponent } from '@/Support/Interfaces/Models';
import {
    CarriagePanelResource,
    ComponentMaterialResource,
    ComponentResource,
    ProgressResource,
    Resource,
} from '@/Support/Interfaces/Resources';

export interface CarriagePanelComponentResource extends Resource, CarriagePanelComponent {
    component: ComponentResource;
    component_materials: ComponentMaterialResource[];
    carriage_panel: CarriagePanelResource;
    progress: ProgressResource;
}
