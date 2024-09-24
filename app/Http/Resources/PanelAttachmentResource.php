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
            case IntentEnum::API_PANEL_ATTACHMENT_GET_ATTACHMENTS->value:
                return [
                    'attachment_number' => $this->attachment_number,
                    'source_workstation' => $this->source_workstation->name,
                    'destination_workstation' => $this->destination_workstation->name,
                    'trainset' => $this->carriage_panel->carriage_trainset->trainset->name,
                    'carriage' => $this->carriage_panel->carriage_trainset->carriage->type,
                    'panel' => $this->carriage_panel->panel->name,
                    'qr_code' => $this->qr_code,
                    'qr_path' => $this->qr_path,
                    'created_at' => $this->created_at,
                    'updated_at' => $this->updated_at,
                ];
            case IntentEnum::API_PANEL_ATTACHMENT_GET_ATTACHMENT_DETAILS->value:
                return [
                    'id' => $this->id,
                    'attachment_number' => $this->attachment_number,
                    'project' => new ProjectResource($this->carriage_panel?->carriage_trainset->trainset->project),
                    'trainset' => new TrainsetResource($this->carriage_panel?->carriage_trainset->trainset),
                    'carriage_trainset' => new CarriageTrainsetResource($this->carriage_panel?->carriage_trainset()->with('carriage')->without('trainset')->first()),
                    'carriage_panel' => new CarriagePanelResource($this->carriage_panel),
                    'serial_panels' => SerialPanelResource::collection($this->serial_panels),
                    'source_workstation' => new WorkstationResource($this->source_workstation()->with('workshop')->first()),
                    'destination_workstation' => new WorkstationResource($this->destination_workstation()->with('workshop')->first()),
                    'qr_code' => $this->qr_code,
                    'qr_path' => $this->qr_path,
                    'current_step' => $this->current_step,
                    'elapsed_time' => $this->elapsed_time,
                    'status' => $this->status,
                    // 'panel_attachment_childs' => PanelAttachmentResource::collection($this->childs),
                    // 'panel_attachment_parents' => new PanelAttachmentResource($this->parent),
                    'supervisor' => new UserResource($this->whenLoaded('supervisor')),
                    'panel_attachment_handlers' => PanelAttachmentHandlerResource::collection($this->panel_attachment_handlers),
                    'created_at' => $this->created_at,
                    'updated_at' => $this->updated_at,
                ];
            case IntentEnum::API_PANEL_ATTACHMENT_GET_ATTACHMENT_SERIAL_NUMBER_DETAILS->value:
                return [
                    'attachment_number' => $this->attachment_number,
                    'source_workstation' => $this->source_workstation->name,
                    'status' => $this->status,
                    'destination_workstation' => $this->destination_workstation->name,
                    'trainset' => $this->carriage_panel->carriage_trainset->trainset->name,
                    'carriage' => $this->carriage_panel->carriage_trainset->carriage->type,
                    'panel' => $this->carriage_panel->panel->name,
                    'created_at' => $this->created_at,
                    'updated_at' => $this->updated_at,
                ];
            case IntentEnum::API_PANEL_ATTACHMENT_GET_ATTACHMENT_DETAILS_FILTER_STATUS_PROCESS->value:
                    return [
                        'id' => $this->id,
                        'attachment_number' => $this->attachment_number,
                        'status' => $this->status,
                        'source_workstation' => $this->source_workstation->name,
                        'destination_workstation' => $this->destination_workstation->name,
                        'trainset' => $this->carriage_panel->carriage_trainset->trainset->name,
                        'carriage' => $this->carriage_panel->carriage_trainset->carriage->type,
                        'panel' => $this->carriage_panel->panel->name,
                        'qr_code' => $this->qr_code,
                        'qr_path' => $this->qr_path,
                        'created_at' => $this->created_at,
                        'updated_at' => $this->updated_at,
                    ];
                case IntentEnum::API_PANEL_ATTACHMENT_GET_ATTACHMENT_DETAILS_FILTER_STATUS_DONE->value:
                    return [
                        'id' => $this->id,
                        'attachment_number' => $this->attachment_number,
                        'status' => $this->status,
                        'source_workstation' => $this->source_workstation->name,
                        'destination_workstation' => $this->destination_workstation->name,
                        'trainset' => $this->carriage_panel->carriage_trainset->trainset->name,
                        'carriage' => $this->carriage_panel->carriage_trainset->carriage->type,
                        'panel' => $this->carriage_panel->panel->name,
                        'qr_code' => $this->qr_code,
                        'qr_path' => $this->qr_path,
                        'created_at' => $this->created_at,
                        'updated_at' => $this->updated_at,
                        ];        
        }

        return [
            'id' => $this->id,
            'attachment_number' => $this->attachment_number,
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
            'panel_attachment_handlers' => PanelAttachmentHandlerResource::collection($this->panel_attachment_handlers),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}