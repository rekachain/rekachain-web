<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PanelAttachmentHandlerResource extends JsonResource {
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array {
        return [
            'id' => $this->id,
            'user_id' => $this->user_id,
            'user' => UserResource::make($this->whenLoaded('user')),
            'handler_name' => $this->handler_name,
            'panel_attachment_id' => $this->panel_attachment_id,
            'handles' => $this->handles->value,
            'localized_handles' => $this->handles->getLabel(),
        ];
    }
}
