<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class DetailWorkerPanelResource extends JsonResource {
    public function toArray($request): array {
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