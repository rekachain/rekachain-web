<?php

namespace App\Http\Resources;

use App\Support\Enums\IntentEnum;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TrainsetAttachmentResource extends JsonResource {
    public function toArray(Request $request): array {
        $intent = $request->get('intent');

        switch ($intent) {
            case IntentEnum::API_TRAINSET_ATTACHMENT_GET_ATTACHMENTS->value:
                return [
                    'attachment_number' => $this->attachment_number,
                    'source_workstation' => WorkstationResource::make($this->source_workstation()->with('workshop', 'division')->first()),
                    'destination_workstation' => WorkstationResource::make($this->destination_workstation()->with('workshop', 'division')->first()),
                    'project' => $this->trainset->project->name,
                    'trainset' => $this->trainset->name,
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
                $trainsetAttachment = $this->load(['trainset_attachment_components'=>['carriage_panel_component'=>['progress'=>['progress_steps']],'detail_worker_trainsets'=>['progress_step','worker']]]);
                $trainsetComponents = $trainsetAttachment->trainset_attachment_components->map(function ($trainsetAttachmentComponent) use ($trainsetAttachment) {
                    $componentSteps = $trainsetAttachmentComponent->carriage_panel_component->progress->progress_steps->map(function ($progressStep) use ($trainsetAttachment) {
                        $workers = collect();
                        $trainsetAttachment->detail_worker_trainsets->map(function ($detailWorkerTrainset) use ($progressStep, &$workers) {
                            if ($detailWorkerTrainset->progress_step_id === $progressStep->id) {
                                if (!$workers->firstWhere('nip', $detailWorkerTrainset->worker->nip)) {
                                    $workers->push([
                                        'nip'=>$detailWorkerTrainset->worker->nip,
                                        'name'=>$detailWorkerTrainset->worker->name,
                                        // 'started_at'=>$detailWorkerTrainset->created_at->toDateTimeString(),
                                    ]);
                                }
                            }
                        });
                        return [
                            // 'step_id' => $progressStep->step->id,
                            // 'progress_step_id' => $progressStep->id,
                            'step_name'=>$progressStep->step->name,
                            'step_process'=>$progressStep->step->process,
                            'estimated_time'=>$progressStep->step->estimated_time,
                            'total_workers' => $workers->count(),
                            'workers' => $workers
                        ];
                    });
                    return [
                        // 'component_id' => $trainsetAttachmentComponent->carriage_panel_component->component_id,
                        'component_name' => $trainsetAttachmentComponent->carriage_panel_component->component->name,
                        'component_required' => $trainsetAttachmentComponent->total_required,
                        'progress' => [
                            // 'progress_id' => $trainsetAttachmentComponent->carriage_panel_component->progress_id,
                            'progress_name' => $trainsetAttachmentComponent->carriage_panel_component->progress->name,
                            'work_aspect' => [
                                'work_aspect_name' => $trainsetAttachmentComponent->carriage_panel_component->progress->work_aspect->name,
                                'work_aspect_description' => $trainsetAttachmentComponent->carriage_panel_component->progress->work_aspect->description
                            ],
                        ],
                        'total_steps' => $componentSteps->count(),
                        'steps' => $componentSteps
                    ];
                });

                return [
                    'attachment_number' => $this->attachment_number,
                    'total_components' => $this->trainset_attachment_components->count(),
                    'trainset_components' => $trainsetComponents
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
                    'supervisor' => UserResource::make($this->whenLoaded('supervisor')),
                    'trainset_attachment_id' => $this->trainset_attachment_id,
                    'trainset_attachment_handlers' => TrainsetAttachmentHandlerResource::collection($this->whenLoaded('trainset_attachment_handlers')),
                    'created_at' => $this->created_at->toDateTimeString(),
                    'updated_at' => $this->updated_at->toDateTimeString(),
                ];
        }
    }
}
