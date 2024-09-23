import { Step } from '../Models';
import { ProgressResource, Resource, UserResource } from '';

export interface StepResource extends Resource, Step {
    can_be_deleted: boolean;
    progress: ProgressResource;
    user: UserResource;
}
