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
                    'localized_work_status' => $this->work_status->getLabel(),
                    'acceptance_status' => $this->acceptance_status,
                    'localized_acceptance_status' => $this->acceptance_status->getLabel(),
                ];
            case IntentEnum::API_DETAIL_WORKER_PANEL_GET_PANEL_DETAILS->value:
                return [
                    // 'attachment_number' => $this->attachment_number,
                    'id' => $this->id,
                    'panel_name' => PanelResource::make($this->serial_panel->panel_attachment->carriage_panel->panel),
                    'carriage_type' => CarriageResource::make($this->serial_panel->panel_attachment->carriage_panel->carriage_trainset->carriage),
                    'id_project' => $this->serial_panel->panel_attachment->carriage_panel->carriage_trainset->trainset->project,
                    'worker_desc' => $this->worker,
                    'step' => $this->progress_step->step,
                    'no_serial_panel' => $this->serial_panel_id,
                    'attachment_number' => PanelAttachmentResource::make($this->serial_panel->panel_attachment)->without('trainset')->first(),
                    'estimated_time' => $this->estimated_time,
                    'work_status' => $this->work_status,
                    'localized_work_status' => $this->work_status->getLabel(),
                    'acceptance_status' => $this->acceptance_status,
                    'localized_acceptance_status' => $this->acceptance_status->getLabel(),
                ];
            case IntentEnum::API_DETAIL_WORKER_PANELS_GET_ALL_WORK_DETAIL->value:
                return [
                    'id' => $this->id,
                    'panel_attachment_id' => $this->serial_panel->panel_attachment_id,
                    'attachment_number' => $this->serial_panel->panel_attachment->attachment_number,
                    'serial_panel_id' => $this->serial_panel_id,
                    'panel_name' => $this->serial_panel->panel_attachment->carriage_panel->panel->name,
                    'carriage_type' => $this->serial_panel->panel_attachment->carriage_panel->carriage_trainset->carriage->type,
                    'worker_id' => $this->worker_id,
                    'worker_nip' => $this->worker->nip,
                    'worker_name' => $this->worker->name,
                    'progress_step_id' => $this->progress_step_id,
                    'progress_name' => $this->progress_step->progress->name,
                    'work_aspect_name' => $this->progress_step->progress->work_aspect->name,
                    'step_name' => $this->progress_step->step->name,
                    'estimated_time' => $this->estimated_time,
                    'image_path' => $this->image_path,
                    'work_status' => $this->work_status,
                    'localized_work_status' => $this->work_status->getLabel(),
                    'acceptance_status' => $this->acceptance_status,
                    'localized_acceptance_status' => $this->acceptance_status->getLabel(),
                    'created_at' => $this->created_at->toDateTimeString(),
                    'updated_at' => $this->updated_at->toDateTimeString(),
                ];
            case IntentEnum::API_DETAIL_WORKER_PANEL_GET_WORK_DETAILS->value:
                return [
                    'id' => $this->id,
                    'panel_attachment' => PanelAttachmentResource::make($this->panel_attachment),
                    'worker' => UserResource::make($this->worker),
                    'serial_panel' => SerialPanelResource::make($this->serial_panel),
                    'progress_step' => ProgressStepResource::make($this->progress_step),
                    'estimated_time' => $this->estimated_time,
                    'work_status' => $this->work_status,
                    'localized_work_status' => $this->work_status->getLabel(),
                    'acceptance_status' => $this->acceptance_status,
                    'localized_acceptance_status' => $this->acceptance_status->getLabel(),
                    'image_path' => $this->image_path,
                    'created_at' => $this->created_at->toDateTimeString(),
                    'updated_at' => $this->updated_at->toDateTimeString(),
                ];
            default:
                return [
                    'id' => $this->id,
                    'panel_attachment' => PanelAttachmentResource::make($this->whenLoaded('panel_attachment')),
                    'serial_panel_id' => $this->serial_panel_id,
                    'serial_panel' => SerialPanelResource::make($this->whenLoaded('serial_panel')),
                    'worker_id' => $this->worker_id,
                    'worker' => UserResource::make($this->whenLoaded('worker')),
                    'progress_step_id' => $this->progress_step_id,
                    'progress_step' => ProgressStepResource::make($this->whenLoaded('progress_step')),
                    'estimated_time' => $this->estimated_time,
                    'image_path' => $this->image_path,
                    'work_status' => $this->work_status,
                    'localized_work_status' => $this->work_status->getLabel(),
                    'acceptance_status' => $this->acceptance_status,
                    'localized_acceptance_status' => $this->acceptance_status->getLabel(),
                    'created_at' => $this->created_at->toDateTimeString(),
                    'updated_at' => $this->updated_at->toDateTimeString(),
                ];
        }
    }
}
