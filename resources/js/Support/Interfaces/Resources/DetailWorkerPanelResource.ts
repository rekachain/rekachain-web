import { DetailWorkerPanel } from '@/Support/Interfaces/Models';
import { Resource, UserResource } from '@/Support/Interfaces/Resources';

export interface DetailWorkerPanelResource extends Resource, DetailWorkerPanel {
    worker: UserResource;
    localized_acceptance_status: string;
    localized_work_status: string;
}
