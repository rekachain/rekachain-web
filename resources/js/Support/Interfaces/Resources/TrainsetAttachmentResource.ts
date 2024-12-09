import { TrainsetAttachment } from '@/Support/Interfaces/Models';
import { RawMaterialResource, Resource, TrainsetAttachmentHandlerResource } from '@/Support/Interfaces/Resources';

export interface TrainsetAttachmentResource extends Resource, TrainsetAttachment {
    qr?: string;
    formatted_created_at: string;
    formatted_updated_at: string;
    raw_materials: RawMaterialResource[];
    trainset_attachment_handlers?: TrainsetAttachmentHandlerResource[];
    is_ancestor?: boolean;
    is_parent?: boolean;
    is_child?: boolean;
    ancestor?: TrainsetAttachmentResource;
    parent?: TrainsetAttachmentResource;
    childs?: TrainsetAttachmentResource[];
}
