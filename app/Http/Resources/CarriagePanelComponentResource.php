<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CarriagePanelComponentResource extends JsonResource {
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array {
        return [
            'id' => $this->id,
            'component_id' => $this->component_id,
            'component' => ComponentResource::make($this->whenLoaded('component')),
            'carriage_panel_id' => $this->carriage_panel_id,
            'carriage_panel' => CarriagePanelResource::make($this->whenLoaded('carriage_panel')),
            'progress_id' => $this->progress_id,
            'progress' => ProgressResource::make($this->whenLoaded('progress')),
            'qty' => $this->qty,
            'created_at' => $this->created_at->toDateTimeString(),
            'updated_at' => $this->updated_at->toDateTimeString(),
        ];
    }
}
