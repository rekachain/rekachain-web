<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TrainsetAttachmentHandlerResource extends JsonResource {
    public function toArray(Request $request): array {
        return [
            'id' => $this->id,
            'user_id' => $this->user_id,
            'user' => UserResource::make($this->whenLoaded('user')),
            'handler_name' => $this->handler_name,
            'trainset_attachment_id' => $this->trainset_attachment_id,
            'handles' => $this->handles,
        ];
    }
}
