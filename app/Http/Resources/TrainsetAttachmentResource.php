<?php

namespace App\Http\Resources;

use App\Support\Enums\IntentEnum;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TrainsetAttachmentResource extends JsonResource {
    public function toArray(Request $request): array {
        $intent = $request->get('intent');

        switch ($intent) {
            case IntentEnum::API_TRAINSET_ATTACHMENT_GET_ATTACHMENT_DETAILS->value:
                return [
                    'attachment_number' => $this->attachment_number,
                    'source_workstation' => WorkstationResource::make($this->source_workstation),
                    'destination_workstation' => WorkstationResource::make($this->destination_workstation),
                    'trainset' => new TrainsetResource($this->carriage_trainset->trainset),
                    'qr_code' => $this->qr_code,
                    'qr_path' => $this->qr_path,
                    'status' => $this->status,
                    'elapsed_time' => $this->elapsed_time,
                    'supervisor' => UserResource::make($this->supervisor),
                    'trainset_attachment_id' => $this->trainset_attachment_id,
                    'trainset_attachment_components' => TrainsetAttachmentComponentResource::collection($this->trainset_attachment_components),
                    'created_at' => $this->created_at->toDateTimeString(),
                    'updated_at' => $this->updated_at->toDateTimeString(),
                ];
            case IntentEnum::API_TRAINSET_ATTACHMENT_GET_ATTACHMENT_MATERIALS->value:
                $trainsetAttachment = $this->load(['trainset_attachment_components'=>['carriage_panel_component'=>['component_materials']]]);
                
                $materials = collect();
                $trainsetAttachment->trainset_attachment_components->map(function ($trainsetAttachmentComponent) use (&$materials, $trainsetAttachment) {
                    $trainsetAttachmentComponent->carriage_panel_component->component_materials->map(function ($componentMaterial) use (&$materials, $trainsetAttachmentComponent) {
                        $totalQty = $trainsetAttachmentComponent->total_required * $componentMaterial->qty;
                        $material = $materials->firstWhere('raw_material_id', $componentMaterial->raw_material_id);
                        if (!$material) {
                            $materials->push([
                                'raw_material_id' => $componentMaterial->raw_material_id,
                                'material_code' => $componentMaterial->raw_material->material_code,
                                'material' => $componentMaterial->raw_material->description,
                                'total_qty' => $totalQty
                            ]);
                        } else {
                            $materials->transform(function ($item) use ($totalQty, $componentMaterial) {
                                if ($item['raw_material_id'] === $componentMaterial->raw_material_id) {
                                    $item['total_qty'] += $totalQty;
                                }
                                return $item;
                            });
                        }
                    });
                });
                // $materials = $materials->sortBy('raw_material_id');
                return [
                    'attachment_number' => $this->attachment_number,
                    'total_materials' => $materials->count(),
                    // 'materials' => $materials->sortBy('raw_material_id'),
                    'materials' => $materials,
                ];
            default:
                return [
                    'id' => $this->id,
                    'attachment_number' => $this->attachment_number,
                    'trainset_id' => $this->trainset_id,
                    'trainset' => new TrainsetResource($this->whenLoaded('trainset')),
                    'source_workstation_id' => $this->source_workstation_id,
                    'source_workstation' => new WorkstationResource($this->whenLoaded('source_workstation')),
                    'destination_workstation_id' => $this->destination_workstation_id,
                    'destination_workstation' => new WorkstationResource($this->whenLoaded('destination_workstation')),
                    'qr_code' => $this->qr_code,
                    'qr_path' => $this->qr_path,
                    'status' => $this->status,
                    'elapsed_time' => $this->elapsed_time,
                    'supervisor_id' => $this->supervisor_id,
                    'supervisor_name' => $this->supervisor?->name,
                    'supervisor' => UserResource::make($this->whenLoaded('supervisor')),
                    'trainset_attachment_id' => $this->trainset_attachment_id,
                    'created_at' => $this->created_at->toDateTimeString(),
                    'updated_at' => $this->updated_at->toDateTimeString(),
                ];
        }
    }
}
