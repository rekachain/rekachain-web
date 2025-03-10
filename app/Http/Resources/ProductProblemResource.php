<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ProductProblemResource extends JsonResource {
    public function toArray($request): array {
        return [
            'id' => $this->id,
            'returned_product_id' => $this->returned_product_id,
            'returned_product' => $this->whenLoaded('returned_product'),
            'component_id' => $this->component_id,
            'component' => $this->whenLoaded('component'),
            'status' => $this->status,
            'created_at' => $this->created_at->toDateTimeString(),
            'updated_at' => $this->updated_at->toDateTimeString(),
        ];
    }
}