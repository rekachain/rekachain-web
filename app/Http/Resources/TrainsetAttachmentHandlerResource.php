<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class TrainsetAttachmentHandlerResource extends JsonResource {
    public function toArray($request): array {
        return [
            'id' => $this->id,
            'user' => $this->user,
            'handles' => $this->handles,
        ];
    }
}