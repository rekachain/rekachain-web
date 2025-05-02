<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductProblemNoteResource extends JsonResource {
    public function toArray(Request $request): array {
        return [
            'id' => $this->id,
            'product_problem_id' => $this->product_problem_id,
            'product_problem' => $this->whenLoaded('product_problem'),
            'note' => $this->note,
            'user_id' => $this->user_id,
            'user' => $this->whenLoaded('user'),
            'user_name' => $this->user->name,
            'level' => $this->user->roles()->first()->level,
            'created_at' => $this->created_at->toDateTimeString(),
            'updated_at' => $this->updated_at->toDateTimeString(),
        ];
    }
}
