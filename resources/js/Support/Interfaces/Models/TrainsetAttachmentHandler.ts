import { TrainsetAttachmentHandlerHandlesEnum } from '@/Support/Enums/trainsetAttachmentHandlerHandlesEnum';

export interface TrainsetAttachmentHandler {
    id: number;
    user_id: number;
    handler_name: string;
    trainset_attachment_id: number;
    handles: TrainsetAttachmentHandlerHandlesEnum;
    created_at: string;
    updated_at: string;
}
