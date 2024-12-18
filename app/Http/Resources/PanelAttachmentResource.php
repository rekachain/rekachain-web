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
            case IntentEnum::WEB_PANEL_ATTACHMENT_GET_PANEL_WITH_QTY->value:
                $attachment = $this->ancestor();

                return [
                    'panel' => PanelResource::make($attachment->carriage_panel->panel),
                    'total_qty' => $attachment->carriage_panel->qty * $attachment->carriage_panel->carriage_trainset->qty,
                ];
            case IntentEnum::WEB_PANEL_ATTACHMENT_GET_PANEL_MATERIALS_WITH_QTY->value:
                if ($this->is_child()) {
                    return $this->custom_attachment_materials
                        ->groupBy(['raw_material_id'])
                        ->map(fn ($panelMaterials) => [
                            ...RawMaterialResource::make($panelMaterials->first()->raw_material)->toArray($request),
                            'total_qty' => $panelMaterials->sum(function ($panelMaterial) {
                                return $panelMaterial->qty;
                            }),
                        ])->sortBy('raw_material.id')->toArray();
                }

                return $this->panel_materials
                    ->groupBy(['raw_material_id'])
                    ->map(fn ($panelMaterials) => [
                        ...RawMaterialResource::make($panelMaterials->first()->raw_material)->toArray($request),
                        'total_qty' => $panelMaterials->sum(function ($panelMaterial) {
                            return $panelMaterial->qty * $panelMaterial->carriage_panel->carriage_trainset->qty;
                        }),
                    ])->sortBy('raw_material.id')->toArray();

            case IntentEnum::API_PANEL_ATTACHMENT_GET_ATTACHMENTS->value:
                return [
                    'id' => $this->id,
                    'attachment_number' => $this->attachment_number,
                    'source_workstation' => new WorkstationResource($this->source_workstation()->with('workshop', 'division')->first()),
                    'destination_workstation' => new WorkstationResource($this->destination_workstation()->with('workshop', 'division')->first()),
                    'project' => $this->carriage_panel->carriage_trainset->trainset->project->name,
                    'trainset' => $this->carriage_panel->carriage_trainset->trainset->name,
                    'carriage' => $this->carriage_panel->carriage_trainset->carriage->type,
                    'panel' => $this->carriage_panel->panel->name,
                    'qr_code' => $this->qr_code,
                    'qr_path' => $this->qr_path,
                    'status' => $this->status,
                    'supervisor_id' => $this->supervisor_id,
                    'supervisor_name' => $this->supervisor?->name,
                    'supervisor' => UserResource::make($this->whenLoaded('supervisor')),
                    'created_at' => $this->created_at,
                    'updated_at' => $this->updated_at,
                    'is_ancestor' => $this->is_ancestor(),
                    'is_parent' => $this->is_parent(),
                    'is_child' => $this->is_child(),
                ];
            case IntentEnum::API_PANEL_ATTACHMENT_GET_ATTACHMENT_DETAILS->value:
                return [
                    'id' => $this->id,
                    'attachment_number' => $this->attachment_number,
                    'project' => new ProjectResource($this->carriage_panel?->carriage_trainset->trainset->project),
                    'trainset' => new TrainsetResource($this->carriage_panel?->carriage_trainset->trainset),
                    'carriage_trainset' => new CarriageTrainsetResource($this->carriage_panel?->carriage_trainset()->with('carriage')->without('trainset')->first()),
                    'carriage_panel' => new CarriagePanelResource($this->carriage_panel),
                    'source_workstation' => new WorkstationResource($this->source_workstation()->with('workshop', 'division')->first()),
                    'destination_workstation' => new WorkstationResource($this->destination_workstation()->with('workshop', 'division')->first()),
                    'qr_code' => $this->qr_code,
                    'qr_path' => $this->qr_path,
                    'current_step' => $this->current_step,
                    'elapsed_time' => $this->elapsed_time,
                    'status' => $this->status,
                    'supervisor' => new UserResource($this->supervisor),
                    'panel_attachment_handlers' => PanelAttachmentHandlerResource::collection($this->panel_attachment_handlers),
                    'serial_panels' => SerialPanelResource::collection($this->serial_panels),
                    'attachment_notes' => AttachmentNoteResource::collection($this->attachment_notes),
                    'created_at' => $this->created_at,
                    'updated_at' => $this->updated_at,
                    'is_ancestor' => $this->is_ancestor(),
                    'is_parent' => $this->is_parent(),
                    'is_child' => $this->is_child(),
                    'ancestor' => $this->when($this->is_child() && $this->parent->is_child(), $this->ancestor()),
                    'parent' => $this->when($this->is_child(), $this->parent),
                    'childs' => $this->when($this->is_parent(), $this->childs),
                ];
            case IntentEnum::API_PANEL_ATTACHMENT_GET_ATTACHMENT_MATERIALS->value:
                $panelAttachment = $this->ancestor()->load(['carriage_panel' => ['carriage_trainset', 'panel_materials']]);

                $materials = $panelAttachment->carriage_panel->panel_materials->map(function ($panelMaterial) use ($panelAttachment) {
                    $totalQty = $panelAttachment->carriage_panel->carriage_trainset->qty * $panelAttachment->carriage_panel->qty * $panelMaterial->qty;

                    return [
                        'raw_material_id' => $panelMaterial->raw_material_id,
                        'material_code' => $panelMaterial->raw_material->material_code,
                        'material_description' => $panelMaterial->raw_material->description,
                        'total_qty' => $totalQty,
                    ];
                });

                return [
                    'attachment_number' => $panelAttachment->attachment_number,
                    'total_materials' => $materials->count(),
                    'materials' => $materials,
                ];
            case IntentEnum::WEB_PANEL_ATTACHMENT_GET_ATTACHMENT_PROGRESS->value:
                $attachment = $this->ancestor();
                $panelSteps = $attachment->carriage_panel->progress->progress_steps->map(function ($progressStep) use (&$steps) {
                    return [
                        'step_id' => $progressStep->step->id,
                        // 'progress_step_id' => $progressStep->id,
                        'step_name' => $progressStep->step->name,
                        'step_process' => $progressStep->step->process,
                        'estimated_time' => $progressStep->step->estimated_time,
                        'workers' => collect(),
                    ];
                });
                unset($attachment->carriage_panel);

                $serialPanels = $attachment->serial_panels->map(function ($serialPanel) use ($panelSteps) {
                    $steps = collect();
                    $serialPanel->detail_worker_panels->map(function ($detailWorkerPanel) use (&$steps) {
                        $workers = collect();
                        $step = $steps->firstWhere('step_id', $detailWorkerPanel->progress_step->step_id);
                        if (!$step) {
                            $workers->push([
                                'nip' => $detailWorkerPanel->worker->nip,
                                'name' => $detailWorkerPanel->worker->name,
                                'started_at' => $detailWorkerPanel->created_at->toDateTimeString(),
                                'acceptance_status' => $detailWorkerPanel->acceptance_status,
                                'work_status' => $detailWorkerPanel->work_status,
                            ]);
                            $steps->push([
                                'step_id' => $detailWorkerPanel->progress_step->step->id,
                                // 'progress_step_id' => $detailWorkerPanel->progress_step->id,
                                'step_name' => $detailWorkerPanel->progress_step->step->name,
                                'step_process' => $detailWorkerPanel->progress_step->step->process,
                                'estimated_time' => $detailWorkerPanel->progress_step->step->estimated_time,
                                'workers' => $workers,
                            ]);
                        } else {
                            $step['workers']->push([
                                'nip' => $detailWorkerPanel->worker->nip,
                                'name' => $detailWorkerPanel->worker->name,
                                'started_at' => $detailWorkerPanel->created_at->toDateTimeString(),
                                'acceptance_status' => $detailWorkerPanel->acceptance_status,
                                'work_status' => $detailWorkerPanel->work_status,
                            ]);
                        }
                    });
                    $panelSteps->each(function ($panelStep) use (&$steps) {
                        $step = $steps->firstWhere('step_id', $panelStep['step_id']);
                        if (!$step) {
                            $steps->push($panelStep);
                        }
                    });

                    return [
                        'serial_number' => $serialPanel->id,
                        'product_number' => $serialPanel->product_no,
                        'steps' => $steps->sortBy('step_id')->map(function ($step) {
                            return $step;
                        })->values(),
                    ];
                });

                return [
                    'panel' => PanelResource::make($attachment->carriage_panel->panel),
                    'progress' => $attachment->carriage_panel->progress->fresh()->load('work_aspect'),
                    'total_steps' => $attachment->carriage_panel->progress->progress_steps->count(),
                    'serial_panels' => $serialPanels->toArray(),
                ];
                // idonknowwhatisthissupposedtodo💀 seemssavetodeletebutmeh🗿
                // case IntentEnum::API_PANEL_ATTACHMENT_GET_ATTACHMENT_SERIAL_NUMBER_DETAILS->value:
                //     $ancestor = $this->ancestor();
                //     return [
                //         'attachment_number' => $this->attachment_number,
                //         'source_workstation' => $this->source_workstation->name,
                //         'destination_workstation' => $this->destination_workstation->name,
                //         'status' => $this->status,
                //         'trainset' => $ancestor->carriage_panel->carriage_trainset->trainset->name,
                //         'carriage' => $ancestor->carriage_panel->carriage_trainset->carriage->type,
                //         'panel' => $ancestor->carriage_panel->panel->name,
                //         'created_at' => $this->created_at,
                //         'updated_at' => $this->updated_at,
                //     ];
            case IntentEnum::WEB_PANEL_ATTACHMENT_GET_PANEL_MATERIALS->value:
                $panelAttachment = $this->ancestor()->load(['carriage_panel' => ['carriage_trainset', 'panel_materials']]);

                $materialQuantities = $panelAttachment->carriage_panel->panel_materials->map(function ($panelMaterial) use ($panelAttachment) {
                    $totalQty = $panelAttachment->carriage_panel->carriage_trainset->qty * $panelAttachment->carriage_panel->qty * $panelMaterial->qty;

                    return [
                        'id' => $panelMaterial->id,
                        'raw_material_id' => $panelMaterial->raw_material_id,
                        'qty' => $totalQty,
                        'created_at' => $panelMaterial->created_at,
                        'updated_at' => $panelMaterial->updated_at,
                    ];
                });

                return [
                    'id' => $this->id,
                    'carriage_panel_id' => $this->carriage_panel_id,
                    'source_workstation_id' => $this->source_workstation_id,
                    'destination_workstation_id' => $this->destination_workstation_id,
                    'attachment_number' => $this->attachment_number,
                    'qr_code' => $this->qr_code,
                    'qr_path' => $this->qr_path,
                    'current_step' => $this->current_step,
                    'elapsed_time' => $this->elapsed_time,
                    'status' => $this->status,
                    'panel_attachment_id' => $this->panel_attachment_id,
                    'supervisor_id' => $this->supervisor_id,
                    'created_at' => $this->created_at,
                    'updated_at' => $this->updated_at,
                    'panel_materials' => $materialQuantities,
                ];
            default:
                return [
                    'id' => $this->id,
                    'attachment_number' => $this->attachment_number,
                    'source_workstation_id' => $this->source_workstation_id,
                    'source_workstation' => new WorkstationResource($this->whenLoaded('source_workstation')),
                    'destination_workstation_id' => $this->destination_workstation_id,
                    'destination_workstation' => new WorkstationResource($this->whenLoaded('destination_workstation')),
                    'carriage_panel_id' => $this->carriage_panel_id,
                    'carriage_panel' => new CarriagePanelResource($this->whenLoaded('carriage_panel')),
                    'qr_code' => $this->qr_code,
                    'qr_path' => $this->qr_path,
                    'qr' => $this->qr,
                    'serial_panels' => SerialPanelResource::collection($this->whenLoaded('serial_panels')),
                    'serial_numbers' => $this->serial_panels->pluck('id'),
                    // 'current_step' => $this->current_step,
                    'elapsed_time' => $this->elapsed_time,
                    'status' => $this->status,
                    'panel_attachment_id' => $this->panel_attachment_id,
                    'supervisor_id' => $this->supervisor_id,
                    'supervisor' => new UserResource($this->whenLoaded('supervisor')),
                    'panel_attachment_handlers' => PanelAttachmentHandlerResource::collection($this->whenLoaded('panel_attachment_handlers')),
                    'attachment_notes' => AttachmentNoteResource::collection($this->whenLoaded('attachment_notes')),
                    'created_at' => $this->created_at,
                    'updated_at' => $this->updated_at,
                    'formatted_created_at' => $this->created_at->format('d F Y'),
                    'formatted_updated_at' => $this->updated_at->format('d F Y'),
                    'is_ancestor' => $this->is_ancestor(),
                    'is_parent' => $this->is_parent(),
                    'is_child' => $this->is_child(),
                    'ancestor' => $this->when($this->is_child() && $this->parent->is_child(), $this->ancestor()),
                    'parent' => $this->when($this->is_child(), $this->parent),
                    'childs' => $this->when($this->is_parent(), $this->childs),
                ];
        }
    }
}
