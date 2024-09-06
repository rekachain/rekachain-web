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
            case IntentEnum::API_PANEL_GET_ATTACHMENTS->value:
                return [
                    'attachment_number' => $this->attachment_number,
                    'source_workstation' => $this->source_workstation->name,
                    'destination_workstation' => $this->destination_workstation->name,
                    'trainset' => $this->carriage_trainset->trainset->name,
                    'carriage' => $this->carriage_trainset->carriage->type,
                    'panel' => $this->carriage_panel->panel->name,
                    'qr_path' => $this->qr_path,
                    'created_at' => $this->created_at,
                    'updated_at' => $this->updated_at,
                ];
        }

        return [
            'id' => $this->id,
            'attachment_number' => $this->attachment_number,
            'carriage_trainset' => new CarriageTrainsetResource($this->whenLoaded('carriage_trainset')),
            'carriage_panel' => new CarriagePanelResource($this->whenLoaded('carriage_panel')),
            'serial_panels' => SerialPanelResource::collection($this->serial_panels),
            'source_workstation' => new WorkstationResource($this->whenLoaded('source_workstation')),
            'destination_workstation' => new WorkstationResource($this->whenLoaded('destination_workstation')),
            'qr_code' => $this->qr_code,
            'qr_path' => $this->qr_path,
            'current_step' => $this->current_step,
            'elapsed_time' => $this->elapsed_time,
            'status' => $this->status,
            'panel_attachment_id' => $this->panel_attachment_id,
            'supervisor' => new UserResource($this->whenLoaded('supervisor')),
            'handlers' => PanelAttachmentHandlerResource::collection($this->handlers),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
