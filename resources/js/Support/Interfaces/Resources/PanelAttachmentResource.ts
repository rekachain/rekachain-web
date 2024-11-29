import { PanelAttachment } from '@/Support/Interfaces/Models';
import { RawMaterialResource, Resource } from '@/Support/Interfaces/Resources';

export interface PanelAttachmentResource extends Resource, PanelAttachment {
    formatted_created_at: string;
    raw_materials: RawMaterialResource[];
    serial_numbers?: number[]; // used in projectController@panels
    qr?: string; // used in projectController@panels
    is_ancestor?: boolean;
    is_parent?: boolean;
    is_child?: boolean;
    ancestor?: PanelAttachmentResource;
    parent?: PanelAttachmentResource;
    childs?: PanelAttachmentResource[];
}
