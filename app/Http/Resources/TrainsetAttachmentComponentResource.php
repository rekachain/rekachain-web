<?php

namespace App\Http\Resources;

use App\Support\Enums\IntentEnum;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TrainsetAttachmentComponentResource extends JsonResource {
    public function toArray(Request $request): array {
        $intent = $request->get('intent');

        switch ($intent) {
            case IntentEnum::API_TRAINSET_ATTACHMENT_COMPONENT_GET_COMPONENT_DETAILS->value:
                return [
                    'id' => $this->id,
                    'trainset_attachment' => TrainsetAttachmentResource::make($this->trainset_attachment),
                    'carriage_panel_component' => CarriagePanelComponentResource::make($this->carriage_panel_component),
                    'total_required' => $this->total_required,
                    'total_fulfilled' => $this->total_fulfilled,
                    'total_failed' => $this->total_failed,
                    'detail_worker_trainset' => DetailWorkerTrainsetResource::collection($this->detail_worker_trainsets),
                    'created_at' => $this->created_at->toDateTimeString(),
                    'updated_at' => $this->updated_at->toDateTimeString(),
                ];
            default:
                return [
                    'id' => $this->id,
                    'trainset_attachment_id' => $this->trainset_attachment_id,
                    'trainset_attachment' => TrainsetAttachmentResource::make($this->whenLoaded('trainset_attachment')),
                    'carriage_panel_component_id' => $this->carriage_panel_component_id,
                    'carriage_panel_component' => CarriagePanelComponentResource::make($this->whenLoaded('carriage_panel_component')),
                    'total_required' => $this->total_required,
                    'total_fulfilled' => $this->total_fulfilled,
                    'total_failed' => $this->total_failed,
                    'created_at' => $this->created_at->toDateTimeString(),
                    'updated_at' => $this->updated_at->toDateTimeString(),
                ];
        }
    }
}