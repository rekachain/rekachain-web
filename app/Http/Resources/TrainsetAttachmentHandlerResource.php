<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class TrainsetAttachmentHandlerResource extends JsonResource {
    public function toArray($request): array {
        return [
            'id' => $this->id,
            'user_id' => $this->user_id,
            'user' => UserResource::make($this->whenLoaded('user')),
            'handler_name' => $this->handler_name,
            'panel_attachment_id' => $this->panel_attachment_id,
            'handles' => $this->handles,
        ];
    }
}