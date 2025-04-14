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
            'localized_status' => $this->status->getLabel(),
            'image_path' => $this->image_path,
            'image' => $this->image,
            'product_problem_notes' => ProductProblemNoteResource::collection($this->whenLoaded('product_problem_notes')),
            'latest_product_problem_note' => ProductProblemNoteResource::make($this->product_problem_notes->last()),
            'created_at' => $this->created_at->toDateTimeString(),
            'updated_at' => $this->updated_at->toDateTimeString(),
        ];
    }
}
