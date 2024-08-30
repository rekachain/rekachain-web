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
            'kode_material' => $this->kode_material,
            'description' => $this->description,
            'specs' => $this->specs,
            'unit' => $this->unit,
        ];
    }
}
