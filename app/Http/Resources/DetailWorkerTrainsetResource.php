<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DetailWorkerTrainsetResource extends JsonResource {
    public function toArray($request): array {
        return [
            'id' => $this->id,
            'trainset_attachment_id' => $this->trainset_attachment_id,
            'worker_id' => $this->worker_id,
            'progress_step_id' => $this->progress_step_id,
            'estimated_time' => $this->estimated_time,
            'work_status' => $this->work_status,
            'acceptance_status' => $this->acceptance_status,
            // 'created_at' => $this->created_at->toDateTimeString(),
            // 'updated_at' => $this->updated_at->toDateTimeString(),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,

        ];
    }
}
