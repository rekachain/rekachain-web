<?php

namespace App\Http\Resources;

use App\Support\Enums\IntentEnum;
use Illuminate\Http\Resources\Json\JsonResource;

class DetailWorkerPanelResource extends JsonResource {
    public function toArray($request): array {
        $intent = $request->get('intent');

        switch ($intent) {
            case IntentEnum::API_DETAIL_WORKER_PANEL_GET_PANELS->value:
                return [
                    // 'attachment_number' => $this->attachment_number,
                    'worker' => $this->worker,
                    'attachment_number' => $this->serial_panel->panel_attachment,
                    'jenis_pekerjaan' => $this->progress_step->progress,
                    'estimated_time' => $this->estimated_time,
                    'work_status' => $this->work_status,
                    'acceptance_status' => $this->acceptance_status,
                ];
                
            case IntentEnum::API_DETAIL_WORKER_PANEL_GET_PANEL_DETAILS->value:
                return [
                    // 'attachment_number' => $this->attachment_number,
                    'id_detail_worker' => $this->id,
                    'panel_name' => $this->serial_panel->panel_attachment->carriage_panel->panel,
                    'carriage_type' => $this->serial_panel->panel_attachment->carriage_panel->carriage_trainset->carriage,
                    'id_project' => $this->serial_panel->panel_attachment->carriage_panel->carriage_trainset->trainset->project,
                    'worker_desc' => $this->worker,
                    'no_serial_panel' => $this->serial_panel_id,
                    'attachment_number' => $this->serial_panel->panel_attachment,
                    'estimated_time' => $this->estimated_time,
                    'work_status' => $this->work_status,
                    'acceptance_status' => $this->acceptance_status,
                    ];    
        }
        
        return [
            'worker' => $this->worker,
            'step' => $this->step,
            'estimated_time' => $this->estimated_time,
            'work_status' => $this->work_status,
            'acceptance_status' => $this->acceptance_status,
            'created_at' => $this->created_at->toDateTimeString(),
            'updated_at' => $this->updated_at->toDateTimeString(),
        ];
    }
}