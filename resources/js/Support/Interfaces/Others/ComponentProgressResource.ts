import { CarriageResource, ComponentResource, DetailWorkerTrainsetResource, PanelResource, ProgressResource, StepResource } from "../Resources";

interface CarriagePanelComponentProgressResource {
    carriage_panel_component_id: number;
    panel: PanelResource;
    carriage: CarriageResource;
    progress: ProgressResource;
    total_steps: number;
    steps: StepResource & { 
        work_status: string | null;
        workers: DetailWorkerTrainsetResource[];
    }[];
}
export interface ComponentProgressResource {
    component: ComponentResource;
    carriage_panel_components: CarriagePanelComponentProgressResource[];
}
