<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PanelMaterialResource extends JsonResource {
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array {
        // return parent::toArray($request);
        return [
            'id' => $this->id,
            'carriage_panel_id' => $this->carriage_panel_id,
            'raw_material_id' => $this->raw_material_id,
            'qty' => $this->qty,
        ];
    }
}
