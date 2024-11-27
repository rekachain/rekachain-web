import { DetailWorkerAcceptanceStatusEnum } from "@/Support/Enums/DetailWorkerAcceptanceStatusEnum";
import { DetailWorkerWorkStatusEnum } from "@/Support/Enums/DetailWorkerWorkStatusEnum";

export interface DetailWorkerTrainset {
    id: number;
    worker_id: number;
    trainset_attachment_component_id: number;
    progress_step_id: number;
    estimated_time: number;
    work_status: DetailWorkerWorkStatusEnum;
    image_path: string;
    acceptance_status?: DetailWorkerAcceptanceStatusEnum | null;
    created_at: string;
    updated_at: string;
}