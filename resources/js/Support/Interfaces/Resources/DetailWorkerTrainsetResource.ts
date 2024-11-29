import { DetailWorkerTrainset } from '@/Support/Interfaces/Models';
import { Resource, UserResource } from '@/Support/Interfaces/Resources';

export interface DetailWorkerTrainsetResource extends Resource, DetailWorkerTrainset {
    worker?: UserResource;
}
