<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ProductRestockResource extends JsonResource {
    public function toArray($request): array {
        return [
            'id' => $this->id,
            'returned_product_id' => $this->returned_product_id,
            'returned_product' => ReturnedProductResource::make($this->whenLoaded('returned_product')),
            'product_restockable_id' => $this->product_restockable_id,
            'product_restockable_type' => $this->product_restockable_type,
            'product_restockable' => $this->whenLoaded('product_restockable'),
            'project_id' => $this->project_id,
            'project' => ProjectResource::make($this->whenLoaded('project')),
            'project_url' => $this->projectDetailUrl(),
            'status' => $this->status,
            'localized_status' => $this->status->getLabel(),
            'created_at' => $this->created_at->toDateTimeString(),
            'updated_at' => $this->updated_at->toDateTimeString(),
        ];
    }
}
