import {
    CarriageResource,
    DetailWorkerPanelResource,
    PanelResource,
    ProgressResource,
    StepResource,
} from '@/Support/Interfaces/Resources';
interface SerialPanelProgressResource {
    serial_number: number;
    product_no: string;
    steps: StepResource &
        {
            work_status: string | null;
            workers: DetailWorkerPanelResource[];
        }[];
}
export interface PanelProgressResource {
    panel: PanelResource;
    carriage: CarriageResource;
    progress: ProgressResource;
    total_steps: number;
    serial_panels: SerialPanelProgressResource[];
}
