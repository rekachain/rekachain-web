import { PanelAttachment } from '@/Support/Interfaces/Models';
import {
    CarriagePanelResource,
    PanelAttachmentHandlerResource,
    RawMaterialResource,
    Resource,
    WorkstationResource,
} from '@/Support/Interfaces/Resources';

export interface PanelAttachmentResource extends Resource, PanelAttachment {
    formatted_created_at: string;
    carriage_panel?: CarriagePanelResource;
    source_workstation?: WorkstationResource;
    destination_workstation?: WorkstationResource;
    raw_materials: RawMaterialResource[];
    serial_numbers?: number[]; // used in projectController@panels
    qr?: string; // used in projectController@panels
    panel_attachment_handlers?: PanelAttachmentHandlerResource[];
    is_ancestor?: boolean;
    is_parent?: boolean;
    is_child?: boolean;
    ancestor?: PanelAttachmentResource;
    parent?: PanelAttachmentResource;
    childs?: PanelAttachmentResource[];
}
