import { TrainsetAttachmentTypeEnum } from '@/Support/Enums/trainsetAttachmentTypeEnum';

export interface TrainsetAttachment {
    id: number;
    trainset_id: number;
    source_workstation_id: number;
    destination_workstation_id: number;
    attachment_number: number;
    type: TrainsetAttachmentTypeEnum;
    qr_code: string;
    qr_path: string;
    elapsed_time: number;
    trainset_attachment_id: number;
    supervisor_id: number;
    status: string;
    created_at: string;
    updated_at: string;
}
