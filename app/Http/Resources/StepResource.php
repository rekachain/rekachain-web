<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class StepResource extends JsonResource {
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array {
        return [
            'id' => $this->id,
            'progress_id' => $this->progress_id,
            'name' => $this->name,
            'process' => $this->process,
            'progress' => ProgressResource::make($this->whenLoaded('progress')),
            'user' => UserResource::make($this->whenLoaded('user')),
            'estimated_time' => $this->estimated_time,
            'can_be_deleted' => $this->canBeDeleted(),
        ];
    }
}
