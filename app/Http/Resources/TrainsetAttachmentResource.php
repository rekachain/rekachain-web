<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class TrainsetAttachmentResource extends JsonResource {
    public function toArray($request): array {
        return [
            'id' => $this->id,
            'attachment_number' => $this->attachment_number,
            'carriage_trainset_id' => $this->carriage_trainset_id,
            'source_workstation_id' => $this->source_workstation_id,
            'destination_workstation_id' => $this->destination_workstation_id,
            'qr_code' => $this->qr_code,
            'qr_path' => $this->qr_path,
            'status' => $this->status,
            'elapsed_time' => $this->elapsed_time,
            'supervisor_id' => $this->supervisor_id,
            'trainset_attachment_id' => $this->trainset_attachment_id,
            'created_at' => $this->created_at->toDateTimeString(),
            'updated_at' => $this->updated_at->toDateTimeString(),
        ];
    }
}