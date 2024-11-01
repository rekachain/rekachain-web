<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ComponentResource extends JsonResource {
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'description' => $this->description,
            'progress_id' => $this->progress_id,
            // 'panel' => PanelResource::make($this->whenLoaded('panel')),
            'progress' => ProgressResource::make($this->whenLoaded('progress')),
            'can_be_deleted' => $this->canBeDeleted(),
            'updated_at' => $this->updated_at,
        ];
    }
}
