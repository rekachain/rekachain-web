<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class FeedbackResource extends JsonResource {
    public function toArray($request): array {
        return [
            'id' => $this->id,
            'user_id' => $this->user_id,
            'name' => $this->name ?? $this->user->name,
            'email' => $this->email ?? $this->user->email,
            'message' => $this->message,
            'rating' => $this->rating,
            'status' => $this->status,
            'created_at' => $this->created_at->toDateTimeString(),
            'updated_at' => $this->updated_at->toDateTimeString(),
            'can_be_deleted' => $this->canBeDeleted(),
        ];
    }
}
