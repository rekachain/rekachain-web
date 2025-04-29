<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ReturnedProductNoteResource extends JsonResource {
    public function toArray(Request $request): array {
        return [
            'id' => $this->id,
            'returned_product_id' => $this->returned_product_id,
            'returned_product' => $this->whenLoaded('returned_product'),
            'note' => $this->note,
            'user_id' => $this->user_id,
            'user' => UserResource::make($this->whenLoaded('user')),
            'user_name' => $this->user->name,
            'level' => $this->user->roles()->first()->level,
            'created_at' => $this->created_at->toDateTimeString(),
            'updated_at' => $this->updated_at->toDateTimeString(),
            'can_be_updated' => $this->canBeUpdated(),
        ];
    }
}
