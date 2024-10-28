<?php

namespace App\Http\Resources;

use App\Support\Enums\IntentEnum;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TrainsetAttachmentResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $intent = $request->get('intent');

        switch ($intent) {
            case IntentEnum::API_TRAINSET_ATTACHMENT_GET_ATTACHMENT_COMPONENTS->value:
                $trainsetAttachment = $this->load(['trainset_attachment_components']);

                $components = $trainsetAttachment->trainset_attachment_components->mapToGroups(function ($trainset_attachment_component) {
                    return [
                        $trainset_attachment_component->carriage_panel_component->component->id => [
                            'id' => $trainset_attachment_component->carriage_panel_component->component->id,
                            'component_name' => $trainset_attachment_component->carriage_panel_component->component->name,
                            'total_required' => $trainset_attachment_component->total_required,
                            'total_fulfilled' => $trainset_attachment_component->total_fulfilled,
                            'total_failed' => $trainset_attachment_component->total_failed
                        ]
                    ];
                })->map(function ($components) {
                    return [
                        'id' => $components->first()['id'],
                        'component_name' => $components->first()['component_name'],
                        'total_required' => $components->sum('total_required'),
                        'total_fulfilled' => $components->sum('total_fulfilled'),
                        'total_failed' => $components->sum('total_failed')
                    ];
                })->values();

                return [
                    'attachment_number' => $this->attachment_number,
                    'components' => $components
                ];
            case IntentEnum::API_TRAINSET_ATTACHMENT_GET_ATTACHMENT_REQUIRED_COMPONENTS->value:
                $trainsetAttachment = $this->load(['trainset_attachment_components']);
                $components = $trainsetAttachment->trainset_attachment_components->filter(function ($trainset_attachment_component) {
                    return $trainset_attachment_component->total_fulfilled !== $trainset_attachment_component->total_required;
                })->map(function ($trainset_attachment_component) {
                    return [
                        'carriage_panel_component_id' => $trainset_attachment_component->carriage_panel_component_id,
                        'component' => ComponentResource::make($trainset_attachment_component->carriage_panel_component->component),
                        'total_required' => $trainset_attachment_component->total_required,
                        'total_fulfilled' => $trainset_attachment_component->total_fulfilled,
                    ];
                })->unique('component')->values();

                return [
                    'attachment_number' => $this->attachment_number,
                    'components' => $components
                ];
            case IntentEnum::API_TRAINSET_ATTACHMENT_GET_ATTACHMENTS->value:
                return [
                    'id' => $this->id,
                    'attachment_number' => $this->attachment_number,
                    'source_workstation' => WorkstationResource::make($this->source_workstation()->with('workshop', 'division')->first()),
                    'destination_workstation' => WorkstationResource::make($this->destination_workstation()->with('workshop', 'division')->first()),
                    'project' => $this->trainset->project->name,
                    'trainset' => $this->trainset->name,
                    'type' => $this->type,
                    'qr_code' => $this->qr_code,
                    'qr_path' => $this->qr_path,
                    'status' => $this->status,
                    'elapsed_time' => $this->elapsed_time,
                    'supervisor_id' => $this->supervisor_id,
                    'supervisor' => UserResource::make($this->whenLoaded('supervisor')),
                    'trainset_attachment_id' => $this->trainset_attachment_id,
                    'created_at' => $this->created_at->toDateTimeString(),
                    'updated_at' => $this->updated_at->toDateTimeString(),
                ];
            case IntentEnum::API_TRAINSET_ATTACHMENT_GET_ATTACHMENT_DETAILS->value:
                return [
                    'attachment_number' => $this->attachment_number,
                    'source_workstation' => WorkstationResource::make($this->source_workstation()->with('workshop', 'division')->first()),
                    'destination_workstation' => WorkstationResource::make($this->destination_workstation()->with('workshop', 'division')->first()),
                    'trainset' => new TrainsetResource($this->trainset),
                    'type' => $this->type,
                    'qr_code' => $this->qr_code,
                    'qr_path' => $this->qr_path,
                    'status' => $this->status,
                    'elapsed_time' => $this->elapsed_time,
                    'supervisor' => UserResource::make($this->supervisor),
                    'trainset_attachment_id' => $this->trainset_attachment_id,
                    'trainset_attachment_components' => TrainsetAttachmentComponentResource::collection($this->trainset_attachment_components),
                    'attachment_notes' => AttachmentNoteResource::collection($this->attachment_notes),
                    'created_at' => $this->created_at->toDateTimeString(),
                    'updated_at' => $this->updated_at->toDateTimeString(),
                ];
            case IntentEnum::API_TRAINSET_ATTACHMENT_GET_ATTACHMENT_MATERIALS->value:
                $trainsetAttachment = $this->load(['trainset_attachment_components' => ['carriage_panel_component' => ['component_materials']]]);

                $materials = collect();
                $trainsetAttachment->trainset_attachment_components->map(function ($trainsetAttachmentComponent) use (&$materials, $trainsetAttachment) {
                    $trainsetAttachmentComponent->carriage_panel_component->component_materials->map(function ($componentMaterial) use (&$materials, $trainsetAttachmentComponent) {
                        $totalQty = $trainsetAttachmentComponent->total_required * $componentMaterial->qty;
                        $material = $materials->firstWhere('raw_material_id', $componentMaterial->raw_material_id);
                        if (!$material) {
                            $materials->push([
                                'raw_material_id' => $componentMaterial->raw_material_id,
                                'material_code' => $componentMaterial->raw_material->material_code,
                                'material_description' => $componentMaterial->raw_material->description,
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
                $materials = $materials->sortBy('material_code')->values();
                return [
                    'attachment_number' => $this->attachment_number,
                    'total_materials' => $materials->count(),
                    'materials' => $materials,
                ];
            case IntentEnum::API_TRAINSET_ATTACHMENT_GET_ATTACHMENT_PROGRESS->value:
                $trainsetAttachment = $this->load(['trainset_attachment_components' => ['carriage_panel_component' => ['progress' => ['progress_steps']], 'detail_worker_trainsets' => ['worker']]]);
                $progress = $trainsetAttachment->trainset_attachment_components->map(function ($trainsetAttachmentComponent) {
                    return [
                        'progress_id' => $trainsetAttachmentComponent->carriage_panel_component->progress_id,
                        'progress_name' => $trainsetAttachmentComponent->carriage_panel_component->progress->name,
                        'total_steps' => $trainsetAttachmentComponent->carriage_panel_component->progress->progress_steps->count(),
                        'progress_steps' => $trainsetAttachmentComponent->carriage_panel_component->progress->progress_steps->map(function ($progressStep) {
                            return [
                                'id' => $progressStep->step_id,
                                'step_name' => $progressStep->step->name,
                            ];
                        }),
                    ];
                })->groupBy('progress_id')->map(function ($component) {
                    return [
                        'progress_id' => $component->first()['progress_id'],
                        'progress_name' => $component->first()['progress_name'],
                        'total_steps' => $component->first()['total_steps'],
                        'progress_steps' => $component->first()['progress_steps']
                    ];
                })->values();
                return [
                    'attachment_number' => $this->attachment_number,
                    'progress' => $progress
                ];
            default:
                return [
                    'id' => $this->id,
                    'attachment_number' => $this->attachment_number,
                    'trainset_id' => $this->trainset_id,
                    'trainset' => new TrainsetResource($this->whenLoaded('trainset')),
                    'type' => $this->type,
                    'source_workstation_id' => $this->source_workstation_id,
                    'source_workstation' => new WorkstationResource($this->whenLoaded('source_workstation')),
                    'destination_workstation_id' => $this->destination_workstation_id,
                    'destination_workstation' => new WorkstationResource($this->whenLoaded('destination_workstation')),
                    'qr_code' => $this->qr_code,
                    'qr_path' => $this->qr_path,
                    'status' => $this->status,
                    'elapsed_time' => $this->elapsed_time,
                    'supervisor_id' => $this->supervisor_id,
                    'supervisor' => UserResource::make($this->whenLoaded('supervisor')),
                    'trainset_attachment_id' => $this->trainset_attachment_id,
                    'trainset_attachment_handlers' => TrainsetAttachmentHandlerResource::collection($this->whenLoaded('trainset_attachment_handlers')),
                    'created_at' => $this->created_at->toDateTimeString(),
                    'updated_at' => $this->updated_at->toDateTimeString(),
                ];
        }
    }
}
