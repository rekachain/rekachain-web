import { Step } from '@/Support/models';
import { ProgressResource, Resource, UserResource } from '@/Support/interfaces/resources';

export interface StepResource extends Resource, Step {
    can_be_deleted: boolean;
    progress: ProgressResource;
    user: UserResource;
}
