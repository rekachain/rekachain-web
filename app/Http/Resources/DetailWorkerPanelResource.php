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
                    'worker' => $this->worker,
                    'attachment_number' => PanelAttachmentResource::make($this->serial_panel->panel_attachment),
                    'step' => $this->progress_step->step->name,
                    'estimated_time' => $this->estimated_time,
                    'work_status' => $this->work_status,
                    'acceptance_status' => $this->acceptance_status,
                ];
            case IntentEnum::API_DETAIL_WORKER_PANEL_GET_PANEL_DETAILS->value:
                return [
                    // 'attachment_number' => $this->attachment_number,
                    'id_detail_worker' => $this->id,
                    'panel_name' => PanelResource::make($this->serial_panel->panel_attachment->carriage_panel->panel),
                    'carriage_type' => CarriageResource::make($this->serial_panel->panel_attachment->carriage_panel->carriage_trainset->carriage),
                    'id_project' => $this->serial_panel->panel_attachment->carriage_panel->carriage_trainset->trainset->project,
                    'worker_desc' => $this->worker,
                    'step' => $this->worker->step,
                    'no_serial_panel' => $this->serial_panel_id,
                    'attachment_number' => PanelAttachmentResource::make($this->serial_panel->panel_attachment)->without('trainset')->first(),
                    'estimated_time' => $this->estimated_time,
                    'work_status' => $this->work_status,
                    'acceptance_status' => $this->acceptance_status,
                    ];
            case IntentEnum::API_DETAIL_WORKER_PANEL_ASSIGN_WORKER->value:
                return [
                    'serial_panel_id' => $this->serial_panel_id,
                    'worker_id' => $this->worker_id,
                    'progress_step_id' => $this->progress_step_id,
                ];
            default:    
                return [
                    'id' => $this->id,
                    'serial_panel_id' => $this->serial_panel_id,
                    'worker_id' => $this->worker_id,
                    'worker' => UserResource::make($this->whenLoaded('worker')),
                    'progress_step_id' => $this->progress_step_id,
                    'progress_step' => ProgressStepResource::make($this->whenLoaded('progress_step')),
                    'estimated_time' => $this->estimated_time,
                    'work_status' => $this->work_status,
                    'acceptance_status' => $this->acceptance_status,
                    'created_at' => $this->created_at->toDateTimeString(),
                    'updated_at' => $this->updated_at->toDateTimeString(),
                ];
        }
    }
}