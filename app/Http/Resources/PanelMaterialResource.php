<?php

namespace App\Http\Resources;

use App\Support\Enums\IntentEnum;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PanelMaterialResource extends JsonResource {
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array {
        $intent = $request->get('intent');

        switch ($intent) {
            case IntentEnum::API_PANEL_ATTACHMENT_GET_ATTACHMENT_DETAILS->value:
                return [
                    'id' => $this->id,
                    'raw_material' => new RawMaterialResource($this->raw_material),
                    'qty' => $this->qty,
                ];
        }
        return [
            'id' => $this->id,
            'carriage_panel_id' => $this->carriage_panel_id,
            // 'raw_material_id' => $this->raw_material_id,
            'raw_material' => new RawMaterialResource($this->whenLoaded('raw_material')),
            'qty' => $this->qty,
        ];
    }
}
