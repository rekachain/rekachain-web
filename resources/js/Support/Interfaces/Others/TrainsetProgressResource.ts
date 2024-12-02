import { ComponentResource, PanelResource } from '../Resources';
interface TrainsetProgressResource {
    total_plan_qty: number;
    total_fulfilled_qty: number;
    total_progress_qty: number;
    diff: number;
}

export interface TrainsetComponentProgressResource extends TrainsetProgressResource {
    component: ComponentResource;
}

export interface TrainsetPanelProgressResource extends TrainsetProgressResource {
    panel: PanelResource;
}
