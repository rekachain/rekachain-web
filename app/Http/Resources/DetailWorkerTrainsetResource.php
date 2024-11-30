<?php

namespace App\Http\Resources;

use App\Support\Enums\IntentEnum;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DetailWorkerTrainsetResource extends JsonResource {
    public function toArray(Request $request): array {
        $intent = $request->get('intent');

        switch ($intent) {
            case IntentEnum::API_DETAIL_WORKER_TRAINSET_GET_WORK_DETAILS->value:
                return [
                    'id' => $this->id,
                    'trainset_attachment' => TrainsetAttachmentResource::make($this->trainset_attachment),
                    'trainset_attachment_component' => TrainsetAttachmentComponentResource::make($this->trainset_attachment_component),
                    'worker' => UserResource::make($this->worker),
                    'progress_step' => ProgressStepResource::make($this->progress_step),
                    'estimated_time' => $this->estimated_time,
                    'work_status' => $this->work_status,
                    'localized_work_status' => $this->work_status->getLabel(),
                    'image_path' => $this->image_path,
                    'acceptance_status' => $this->acceptance_status,
                    'localized_acceptance_status' => $this->acceptance_status->getLabel(),
                    'created_at' => $this->created_at->toDateTimeString(),
                    'updated_at' => $this->updated_at->toDateTimeString(),
                ];
            case IntentEnum::API_DETAIL_WORKER_TRAINSETS_GET_ALL_WORK_DETAIL->value:
                return [
                    'id' => $this->id,
                    'trainset_attachment_id' => $this->trainset_attachment_component->trainset_attachment_id,
                    'attachment_number' => $this->trainset_attachment_component->trainset_attachment->attachment_number,
                    'trainset_attachment_component_id' => $this->trainset_attachment_component_id,
                    'carriage_panel_component_id' => $this->trainset_attachment_component->carriage_panel_component_id,
                    'panel_id' => $this->trainset_attachment_component->carriage_panel_component->carriage_panel->panel_id,
                    'panel_name' => $this->trainset_attachment_component->carriage_panel_component->carriage_panel->panel->name,
                    'carriage_type' => $this->trainset_attachment_component->carriage_panel_component->carriage_panel->carriage_trainset->carriage->type,
                    'component_id' => $this->trainset_attachment_component->carriage_panel_component->component_id,
                    'component_name' => $this->trainset_attachment_component->carriage_panel_component->component->name,
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
                    'failed_component_manufactures' => FailedComponentManufactureResource::collection($this->failed_component_manufactures),
                    'created_at' => $this->created_at->toDateTimeString(),
                    'updated_at' => $this->updated_at->toDateTimeString(),
                ];
            default:
                return [
                    'id' => $this->id,
                    'trainset_attachment' => TrainsetAttachmentResource::make($this->whenLoaded('trainset_attachment')),
                    'trainset_attachment_component_id' => $this->trainset_attachment_component_id,
                    'trainset_attachment_component' => TrainsetAttachmentComponentResource::make($this->whenLoaded('trainset_attachment_component')),
                    'worker_id' => $this->worker_id,
                    'worker' => UserResource::make($this->whenLoaded('worker')),
                    'progress_step_id' => $this->progress_step_id,
                    'progress_step' => ProgressStepResource::make($this->whenLoaded('progress_step')),
                    'estimated_time' => $this->estimated_time,
                    'work_status' => $this->work_status,
                    'localized_work_status' => $this->work_status->getLabel(),
                    'image_path' => $this->image_path,
                    'acceptance_status' => $this->acceptance_status,
                    'localized_acceptance_status' => $this->acceptance_status->getLabel(),
                    'failed_component_manufactures' => FailedComponentManufactureResource::collection($this->whenLoaded('failed_component_manufactures')),
                    'created_at' => $this->created_at->toDateTimeString(),
                    'updated_at' => $this->updated_at->toDateTimeString(),
                    // 'created_at' => $this->created_at,
                    // 'updated_at' => $this->updated_at,
                ];
        }
    }
}
