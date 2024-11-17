<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProgressResource extends JsonResource {
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array {
        return [
            'id' => $this->id,
            'name' => $this->name,
            // 'status' => $this->status,
            'steps' => StepResource::collection($this->whenLoaded('steps')),
            'progress_steps' => ProgressStepResource::collection($this->whenLoaded('progress_steps')),
            // 'steps' => StepResource::collection($this->steps),
            // 'steps' => $this->steps,
            // 'completion' => $this->completion,
            // 'worker' => new UserResource($this->whenLoaded('worker')),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
