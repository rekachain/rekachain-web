import { DetailWorkerAcceptanceStatusEnum } from "@/Support/Enums/DetailWorkerAcceptanceStatusEnum";
import { DetailWorkerWorkStatusEnum } from "@/Support/Enums/DetailWorkerWorkStatusEnum";

export interface DetailWorkerPanel {
    id: number;
    worker_id: number;
    serial_panel_id: number;
    progress_step_id: number;
    estimated_time: number;
    work_status: DetailWorkerWorkStatusEnum;
    image_path: string;
    acceptance_status?: DetailWorkerAcceptanceStatusEnum | null;
    created_at: string;
    updated_at: string;
}