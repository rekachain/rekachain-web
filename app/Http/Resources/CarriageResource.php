<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CarriageResource extends JsonResource {
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array {
        return [
            'id' => $this->id,
            'type' => $this->type,
            'description' => $this->description,
            'pivot' => $this->pivot,
            'carriage_panels' => CarriagePanelResource::collection($this->whenLoaded('carriage_panels')),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
