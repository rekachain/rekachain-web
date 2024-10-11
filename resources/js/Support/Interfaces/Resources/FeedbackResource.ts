import { Feedback } from '@/Support/Interfaces/Models';
import { Resource, UserResource } from '@/Support/Interfaces/Resources';

export interface FeedbackResource extends Resource, Feedback {
    user?: UserResource;
    can_be_deleted: boolean;
}
