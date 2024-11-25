<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class CustomAttachmentMaterialResource extends JsonResource {
    public function toArray($request): array {
        return [
            'id' => $this->id,
            'raw_material_id' => $this->raw_material_id,
            'raw_material' => new RawMaterialResource($this->whenLoaded('raw_material')),
            'qty' => $this->qty,
            'created_at' => $this->created_at->toDateTimeString(),
            'updated_at' => $this->updated_at->toDateTimeString(),
        ];
    }
}
