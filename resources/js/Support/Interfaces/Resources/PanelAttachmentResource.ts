import { RawMaterialResource, Resource } from '@/Support/Interfaces/Resources';
import { PanelAttachment } from '@/Support/Interfaces/Models';

export interface PanelAttachmentResource extends Resource, PanelAttachment {
    formatted_created_at: string;
    raw_materials: RawMaterialResource[];
    serial_numbers?: number[]; // used in projectController@panels
    qr?: string; // used in projectController@panels
}
