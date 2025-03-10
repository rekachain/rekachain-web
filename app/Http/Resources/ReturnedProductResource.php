<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ReturnedProductResource extends JsonResource {
    public function toArray(Request $request): array {
        return [
            'id' => $this->id,
            'product_returnable_id' => $this->product_returnable_id,
            'product_returnable_type' => $this->product_returnable_type,
            'product_return' => $this->whenLoaded('product_returnable'),
            'buyer_id' => $this->buyer_id,
            'buyer' => $this->whenLoaded('buyer'),
            'qty' => $this->qty,
            'serial_number' => $this->serial_number,
            'product_problems' => $this->whenLoaded('product_problems'),
            'created_at' => $this->created_at->toDateTimeString(),
            'updated_at' => $this->updated_at->toDateTimeString(),
        ];
    }
}