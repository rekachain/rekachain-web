<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class DetailWorkerTrainsetResource extends JsonResource {
    public function toArray($request): array {
        return [
            'worker' => $this->worker,
            'estimated_time' => $this->estimated_time,
            'work_status' => $this->work_status,
            'progress_step_id' => $this->progress_step_id,
            'progress_step' => ProgressStepResource::make($this->whenLoaded('progress_step')),
            'acceptance_status' => $this->acceptance_status,
            'created_at' => $this->created_at->toDateTimeString(),
            'updated_at' => $this->updated_at->toDateTimeString(),
        ];
    }
}