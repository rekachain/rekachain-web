import { Step } from '@/Support/Interfaces/Models';
import { ProgressResource, Resource, UserResource } from '@/Support/Interfaces/Resources';

export interface StepResource extends Resource, Step {
    can_be_deleted: boolean;
    progress: ProgressResource;
    user: UserResource;
}
