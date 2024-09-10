import { Step } from '@/support/models';
import { ProgressResource, Resource, UserResource } from '@/support/interfaces/resources';

export interface StepResource extends Resource, Step {
    can_be_deleted: boolean;
    progress: ProgressResource;
    user: UserResource;
}
