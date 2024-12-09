import { TrainsetAttachment } from '@/Support/Interfaces/Models';
import { RawMaterialResource, Resource, TrainsetAttachmentHandlerResource, WorkstationResource } from '@/Support/Interfaces/Resources';

export interface TrainsetAttachmentResource extends Resource, TrainsetAttachment {
    qr?: string;
    formatted_created_at: string;
    formatted_updated_at: string;
    source_workstation?: WorkstationResource;
    destination_workstation?: WorkstationResource;
    raw_materials: RawMaterialResource[];
    trainset_attachment_handlers?: TrainsetAttachmentHandlerResource[];
    is_ancestor?: boolean;
    is_parent?: boolean;
    is_child?: boolean;
    ancestor?: TrainsetAttachmentResource;
    parent?: TrainsetAttachmentResource;
    childs?: TrainsetAttachmentResource[];
}
