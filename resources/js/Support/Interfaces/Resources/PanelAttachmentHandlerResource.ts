import { PanelAttachmentHandler } from '@/Support/Interfaces/Models';
import { PanelAttachmentResource, Resource, UserResource } from '@/Support/Interfaces/Resources';

export interface PanelAttachmentHandlerResource extends Resource, PanelAttachmentHandler {
    panel_attachment?: PanelAttachmentResource;
    user?: UserResource;
    localized_handles: string;
}
