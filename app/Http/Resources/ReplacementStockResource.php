<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ReplacementStockResource extends JsonResource {
    public function toArray(Request $request): array {
        return [
            'id' => $this->id,
            'component_id' => $this->component_id,
            'component' => ComponentResource::make($this->whenLoaded('component')),
            'threshold' => $this->threshold,
            'qty' => $this->qty,
            'created_at' => $this->created_at->toDateTimeString(),
            'updated_at' => $this->updated_at->toDateTimeString(),
        ];
    }
}