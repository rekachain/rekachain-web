<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class FailedComponentManufactureResource extends JsonResource {
    public function toArray($request): array {
        return [
            'id' => $this->id,
            'detail_worker_trainset_id' => $this->detail_worker_trainset_id,
            'detail_worker_trainset' => DetailWorkerTrainsetResource::make($this->whenLoaded('detail_worker_trainset')),
            'trainset_attachment_component' => $this->detail_worker_trainset->trainset_attachment_component,
            'notes' => $this->notes,
            'created_at' => $this->created_at->toDateTimeString(),
            'updated_at' => $this->updated_at->toDateTimeString(),
        ];
    }
}