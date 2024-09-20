<?php

namespace App\Http\Resources;

use App\Support\Enums\IntentEnum;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SerialPanelResource extends JsonResource {
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array {
        $intent = $request->get('intent');

        switch ($intent) {
            case IntentEnum::API_PANEL_ATTACHMENT_GET_ATTACHMENT_SERIAL_NUMBER->value:
                return [
                    'serial_number' => $this->id,
                    'project' => $this->panel_attachment?->carriage_panel->carriage_trainset->trainset->project->name,
                    'trainset' => $this->panel_attachment?->carriage_panel->carriage_trainset->trainset->name,
                    'carriage' => $this->panel_attachment?->carriage_panel->carriage_trainset->carriage->type,
                    'panel' => $this->panel_attachment?->carriage_panel->panel->name,
                    'created_at' => $this->created_at,
                    'updated_at' => $this->updated_at,
                ];
            case IntentEnum::API_PANEL_ATTACHMENT_GET_ATTACHMENT_SERIAL_NUMBER_DETAILS->value:
                return [
                    'serial_number' => $this->id,
                    'project' => $this->panel_attachment?->carriage_panel->carriage_trainset->trainset->project->name,
                    'trainset' => $this->panel_attachment?->carriage_panel->carriage_trainset->trainset->name,
                    'carriage' => $this->panel_attachment?->carriage_panel->carriage_trainset->carriage->type,
                    'panel' => $this->panel_attachment?->carriage_panel->panel->name,
                    'manufacture_status' => $this->manufacture_status,
                    'notes' => $this->notes,
                    'panel_attachment' => PanelAttachmentResource::make($this->whenLoaded('panel_attachment')),
                    'detail_workers' => DetailWorkerPanelResource::collection($this->whenLoaded('detail_worker_panels')),
                    'created_at' => $this->created_at,
                    'updated_at' => $this->updated_at,
                ];
            case IntentEnum::API_PANEL_ATTACHMENT_GET_ATTACHMENT_SERIAL_NUMBERS->value:
                return [
                    'serial_number' => $this->id,
                    'panel' => $this->panel_attachment?->carriage_panel->panel->name,
                    'carriage' => $this->panel_attachment?->carriage_panel->carriage_trainset->carriage->type,
                    'qr_code' => $this->qr_code,
                    'qr_path' => $this->qr_path,
                    'created_at' => $this->created_at,
                    'updated_at' => $this->updated_at,
                ];
        }

        return [
            'serial_number' => $this->id,
            // 'panel_attachment_id' => $this->panel_attachment_id,
            'qr_code' => $this->qr_code,
            'qr_path' => $this->qr_path,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
