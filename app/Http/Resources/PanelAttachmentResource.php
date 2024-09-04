<?php

namespace App\Http\Resources;

use App\Support\Enums\IntentEnum;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PanelAttachmentResource extends JsonResource {
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array {
        $intent = $request->get('intent');

        switch ($intent) {
            case IntentEnum::API_PANEL_ATTACHMENT_INDEX->value:
                return [
                    'source_workstation' => $this->source_workstation->name,
                    'destination_workstation' => $this->destination_workstation->name,
                    'carriage_panel' => $this->carriage_panel->panel->name,
                    'carriage_trainset' => $this->carriage_trainset->trainset->name,
                    'created_at' => $this->created_at,
                    'updated_at' => $this->updated_at,
                ];
        }

        return [
            'id' => $this->id,
            'carriage_trainset' => new CarriageTrainsetResource($this->whenLoaded('carriage_trainset')),
            'carriage_panel' => new CarriagePanelResource($this->whenLoaded('carriage_panel')),
            'source_workstation' => new WorkstationResource($this->whenLoaded('source_workstation')),
            'destination_workstation' => new WorkstationResource($this->whenLoaded('destination_workstation')),
            'qr_path' => $this->qr_path,
            'current_step' => $this->current_step,
            'elapsed_time' => $this->elapsed_time,
            'status' => $this->status,
            'panel_attachment_id' => $this->panel_attachment_id,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
