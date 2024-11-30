import { ComponentResource } from "../Resources";
export interface TrainsetComponentProgressResource {
    component: ComponentResource;
    total_plan_qty: number;
    total_fulfilled_qty: number;
    total_progress_qty: number;
    diff: number;
}
