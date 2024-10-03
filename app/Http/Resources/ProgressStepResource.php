<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProgressStepResource extends JsonResource {
    public function toArray(Request $request): array {
        return [
            'id' => $this->id,
            'progress_id' => $this->progress_id,
            'progress' => ProgressResource::make($this->whenLoaded('progress')),
            'step_id' => $this->step_id,
            'step' => StepResource::make($this->whenLoaded('step')),
            'created_at' => $this->created_at->toDateTimeString(),
            'updated_at' => $this->updated_at->toDateTimeString(),
        ];
    }
}
