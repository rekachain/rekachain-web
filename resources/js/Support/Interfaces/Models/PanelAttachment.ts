export interface PanelAttachment {
    id: number;
    carriage_trainset_id: number;
    carriage_panel_id: number;
    source_workstation_id: number;
    destination_workstation_id: number;
    attachment_number: number;
    qr_code: string;
    qr_path: string;
    current_step: number;
    elapsed_time: number;
    status: string;
    panel_attachment_id: number;
    supervisor_id: number;
    created_at: string;
    updated_at: string;
}
