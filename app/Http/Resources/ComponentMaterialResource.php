<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ComponentMaterialResource extends JsonResource {
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array {
        return [
            'id' => $this->id,
            'carriage_panel_component_id' => $this->carriage_panel_component_id,
            'raw_material_id' => $this->raw_material_id,
            'qty' => $this->qty,
            'raw_material' => RawMaterialResource::make($this->whenLoaded('raw_material')),
            'carriage_panel_component' => CarriagePanelComponentResource::make($this->whenLoaded('carriage_panel_component')),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
