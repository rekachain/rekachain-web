import { Trainset } from '@/Support/Interfaces/Models';
import {
    CarriageResource,
    CarriageTrainsetResource,
    PanelAttachmentResource,
    Resource,
    TrainsetAttachmentResource,
} from '@/Support/Interfaces/Resources';

export interface TrainsetResource extends Resource, Trainset {
    // carriages_count: number;
    preset_name: string; // available only in intent: web.project.x
    trainset_attachments: TrainsetAttachmentResource[];
    panel_attachments: PanelAttachmentResource[];
    carriage_trainsets: CarriageTrainsetResource[];
    carriages: CarriageResource[];
    can_be_deleted: boolean;
    has_mechanic_trainset_attachment: boolean;
    has_electric_trainset_attachment: boolean;
    has_panel_attachment: boolean;
    localized_status: string;
}
