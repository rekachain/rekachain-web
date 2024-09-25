import { ProgressResource, Resource, UserResource } from '@/Support/Interfaces/Resources';
import { Step } from '@/Support/Interfaces/Models';

export interface StepResource extends Resource, Step {
    can_be_deleted: boolean;
    progress: ProgressResource;
    user: UserResource;
}
