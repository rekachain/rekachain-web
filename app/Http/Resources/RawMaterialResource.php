<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class RawMaterialResource extends JsonResource {
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array {
        return [
            'id' => $this->id,
            'material_code' => $this->material_code,
            'description' => $this->description,
            'specs' => $this->specs,
            'unit' => $this->unit,
            'can_be_deleted' => $this->canBeDeleted(),
        ];
    }
}
