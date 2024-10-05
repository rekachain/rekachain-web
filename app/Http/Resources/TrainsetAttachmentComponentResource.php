<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class TrainsetAttachmentComponentResource extends JsonResource {
    public function toArray($request): array {
        return [
            'id' => $this->id,
            'trainset_attachment_id' => $this->trainset_attachment_id,
            'carriage_panel_component_id' => $this->carriage_panel_component_id,
            'total_required' => $this->total_required,
            'total_fulfilled' => $this->total_fulfilled,
            'total_failed' => $this->total_failed,
            'created_at' => $this->created_at->toDateTimeString(),
            'updated_at' => $this->updated_at->toDateTimeString(),
        ];
    }
}