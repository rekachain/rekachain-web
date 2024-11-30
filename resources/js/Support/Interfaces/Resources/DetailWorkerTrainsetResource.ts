import { DetailWorkerTrainset } from '@/Support/Interfaces/Models';
import { Resource, UserResource } from '@/Support/Interfaces/Resources';

export interface DetailWorkerTrainsetResource extends Resource, DetailWorkerTrainset {
    worker?: UserResource;
    localized_acceptance_status: string;
    localized_work_status: string;
}
