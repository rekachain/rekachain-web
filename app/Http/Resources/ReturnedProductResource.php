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
            'buyer_id' => $this->buyer_id,
            'qty' => $this->qty,
            'serial_number' => $this->serial_number,
            'created_at' => $this->created_at->toDateTimeString(),
            'updated_at' => $this->updated_at->toDateTimeString(),
        ];
    }
}