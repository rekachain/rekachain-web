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
                    'trainset_attachment_component' => TrainsetAttachmentComponentResource::make($this->trainset_attachment_component),
                    'worker' => UserResource::make($this->worker),
                    'progress_step' => ProgressStepResource::make($this->progress_step),
                    'estimated_time' => $this->estimated_time,
                    'work_status' => $this->work_status,
                    'image_path' => $this->image_path,
                    'acceptance_status' => $this->acceptance_status,
                    'created_at' => $this->created_at->toDateTimeString(),
                    'updated_at' => $this->updated_at->toDateTimeString(),
                ];
            default:
                return [
                    'id' => $this->id,
                    'trainset_attachment_component_id' => $this->trainset_attachment_component_id,
                    'trainset_attachment_component' => TrainsetAttachmentComponentResource::make($this->whenLoaded('trainset_attachment_component')),
                    'worker_id' => $this->worker_id,
                    'worker' => UserResource::make($this->whenLoaded('worker')),
                    'progress_step_id' => $this->progress_step_id,
                    'progress_step' => ProgressStepResource::make($this->whenLoaded('progress_step')),
                    'estimated_time' => $this->estimated_time,
                    'work_status' => $this->work_status,
                    'image_path' => $this->image_path,
                    'acceptance_status' => $this->acceptance_status,
                    // 'created_at' => $this->created_at->toDateTimeString(),
                    // 'updated_at' => $this->updated_at->toDateTimeString(),
                    'created_at' => $this->created_at,
                    'updated_at' => $this->updated_at,
                ];
        }
    }
}