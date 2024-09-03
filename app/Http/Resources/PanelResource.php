<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PanelResource extends JsonResource {
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
            'description' => $this->description,
            'carriage_panels' => CarriagePanelResource::collection($this->whenLoaded('carriage_panels')),
            'progress' => ProgressResource::make($this->whenLoaded('progress')),
            'can_be_deleted' => $this->canBeDeleted(),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
