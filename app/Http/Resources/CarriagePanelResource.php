<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CarriagePanelResource extends JsonResource {
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array {
        return [
            'id' => $this->id,
            'progress_id' => $this->progress_id,
            'carriage_id' => $this->carriage_id,
            'panel_id' => $this->panel_id,
            'panel' => new PanelResource($this->whenLoaded('panel')),
            'carriage_panel_components' => CarriagePanelComponentResource::collection($this->whenLoaded('carriage_panel_components')),
            'panel_materials' => PanelMaterialResource::collection($this->whenLoaded('panel_materials')),
            'qty' => $this->qty,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
