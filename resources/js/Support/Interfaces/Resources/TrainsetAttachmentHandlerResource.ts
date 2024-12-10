import { TrainsetAttachmentHandler } from '@/Support/Interfaces/Models';
import { Resource, TrainsetAttachmentResource, UserResource } from '@/Support/Interfaces/Resources';

export interface TrainsetAttachmentHandlerResource extends Resource, TrainsetAttachmentHandler {
    trainset_attachment?: TrainsetAttachmentResource;
    user?: UserResource;
    localized_handles: string;
}
