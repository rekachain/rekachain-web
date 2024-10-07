<?php

namespace App\Http\Resources;

use App\Support\Enums\IntentEnum;
use Illuminate\Http\Resources\Json\JsonResource;

class TrainsetAttachmentResource extends JsonResource {
    public function toArray($request): array {
        $intent = $request->get('intent');

        switch ($intent) {
            case IntentEnum::API_TRAINSET_ATTACHMENT_GET_ATTACHMENTS->value:
                return [
                    'id' => $this->id,
                    'attachment_number' => $this->attachment_number,
                    'source_workstation' => new WorkstationResource($this->source_workstation()->with('workshop', 'division')->first()),
                    'destination_workstation' => new WorkstationResource($this->destination_workstation()->with('workshop', 'division')->first()),
                    'trainset' => $this->trainset->name,
                    'carriage' => $this->trainset->carriages,
                    // 'panel' => $this->carriage_panel->panel->name,
                    'qr_code' => $this->qr_code,
                    'qr_path' => $this->qr_path,
                    'status' => $this->status,
                    'supervisor_id' => $this->supervisor_id,
                    'supervisor_name' => $this->supervisor?->name,
                    'supervisor' => UserResource::make($this->whenLoaded('supervisor')),
                    'created_at' => $this->created_at,
                    'updated_at' => $this->updated_at,
                ];
            case IntentEnum::API_TRAINSET_ATTACHMENT_GET_ATTACHMENT_DETAILS->value:
                return [
                    'id' => $this->id,
                    'attachment_number' => $this->attachment_number,
                    // 'project' => new ProjectResource($this->carriage_panel?->carriage_trainset->trainset->project),
                    'trainset' => new TrainsetResource($this->carriage_panel?->carriage_trainset->trainset),
                    // 'carriage_trainset' => new CarriageTrainsetResource($this->carriage_panel?->carriage_trainset()->with('carriage')->without('trainset')->first()),
                    // 'carriage_panel' => new CarriagePanelResource($this->carriage_panel),
                    'source_workstation' => new WorkstationResource($this->source_workstation()->with('workshop', 'division')->first()),
                    'destination_workstation' => new WorkstationResource($this->destination_workstation()->with('workshop', 'division')->first()),
                    'qr_code' => $this->qr_code,
                    'qr_path' => $this->qr_path,
                    'current_step' => $this->current_step,
                    'elapsed_time' => $this->elapsed_time,
                    'status' => $this->status,
                    'supervisor' => new UserResource($this->supervisor),
                    // 'panel_attachment_handlers' => PanelAttachmentHandlerResource::collection($this->panel_attachment_handlers),
                    // 'serial_panels' => SerialPanelResource::collection($this->serial_panels),
                    'created_at' => $this->created_at,
                    'updated_at' => $this->updated_at,
                ];
        }    
        
        
        return [
            'id' => $this->id,
            'attachment_number' => $this->attachment_number,
            'trainset_id' => $this->trainset_id,
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