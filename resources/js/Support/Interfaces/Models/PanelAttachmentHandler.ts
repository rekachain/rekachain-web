import { PanelAttachmentHandlerHandlesEnum } from '@/Support/Enums/panelAttachmentHandlerHandlesEnum';

export interface PanelAttachmentHandler {
    id: number;
    user_id: number;
    handler_name: string;
    panel_attachment_id: number;
    handles: PanelAttachmentHandlerHandlesEnum;
    created_at: string;
    updated_at: string;
}
