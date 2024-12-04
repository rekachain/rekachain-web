<?php

namespace App\Http\Resources;

use App\Support\Enums\IntentEnum;
use App\Support\Interfaces\Repositories\TrainsetAttachmentComponentRepositoryInterface;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TrainsetAttachmentResource extends JsonResource {
    public function __construct($resource) {
        parent::__construct($resource);
        $this->trainsetAttachmentComponentRepository = app(TrainsetAttachmentComponentRepositoryInterface::class);
    }

    public function toArray(Request $request): array {
        $intent = $request->get('intent');

        switch ($intent) {
            case IntentEnum::WEB_TRAINSET_ATTACHMENT_GET_COMPONENT_MATERIALS_WITH_QTY->value:
                if ($this->is_child()) {
                    $rawMaterials = $this->custom_attachment_materials
                        ->groupBy('raw_material_id')
                        ->map(fn ($componentMaterials) => [
                            ...RawMaterialResource::make($componentMaterials->first()->raw_material)->toArray($request),
                            'total_qty' => $componentMaterials->sum(fn ($cm) => $cm->qty),
                        ])->sortBy('raw_material.id')->toArray();
                } else {
                    $rawMaterials = $this->component_materials
                        ->groupBy('raw_material_id')
                        ->map(fn ($componentMaterials) => [
                            ...RawMaterialResource::make($componentMaterials->first()->raw_material)->toArray($request),
                            'total_qty' => $componentMaterials->sum(fn ($cm) => $cm->qty * $cm->carriage_panel_component->qty
                                * $cm->carriage_panel_component->carriage_panel->qty
                                * $cm->carriage_panel_component->carriage_panel->carriage_trainset->qty
                            ),
                        ])->sortBy('raw_material.id')->toArray();
                }

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
                    'qr' => $this->qr,
                    'status' => $this->status,
                    'elapsed_time' => $this->elapsed_time,
                    'supervisor_id' => $this->supervisor_id,
                    'supervisor' => UserResource::make($this->whenLoaded('supervisor')),
                    'trainset_attachment_id' => $this->trainset_attachment_id,
                    'raw_materials' => $rawMaterials,
                    'created_at' => $this->created_at->toDateTimeString(),
                    'updated_at' => $this->updated_at->toDateTimeString(),
                    'formatted_created_at' => $this->created_at->format('d F Y'),
                    'formatted_updated_at' => $this->updated_at->format('d F Y'),
                    'is_ancestor' => $this->is_ancestor(),
                    'is_parent' => $this->is_parent(),
                    'is_child' => $this->is_child(),
                    'ancestor' => $this->when($this->is_child() && $this->parent->is_child(), $this->ancestor()),
                    'parent' => $this->when($this->is_child(), $this->parent),
                    'childs' => $this->when($this->is_parent(), $this->childs),
                ];
            case IntentEnum::WEB_TRAINSET_ATTACHMENT_GET_COMPONENT_MATERIALS_WITH_QTY_FOR_TEMPLATE->value:
                $attachmentComponentMaterials = collect();
                $attachmentComponentMaterials = $this->ancestor()->component_materials;

                return $attachmentComponentMaterials
                    ->groupBy('raw_material_id')
                    ->map(fn ($componentMaterials) => [
                        ...RawMaterialResource::make($componentMaterials->first()->raw_material)->toArray($request),
                        'total_qty' => $componentMaterials->sum(fn ($cm) => $cm->qty * $cm->carriage_panel_component->qty
                            * $cm->carriage_panel_component->carriage_panel->qty
                            * $cm->carriage_panel_component->carriage_panel->carriage_trainset->qty
                        ),
                    ])->sortBy('raw_material.id')->toArray();
            case IntentEnum::API_TRAINSET_ATTACHMENT_GET_ATTACHMENT_COMPONENTS->value:
                $trainsetAttachment = $this->ancestor()->load(['trainset_attachment_components']);

                $components = $trainsetAttachment->trainset_attachment_components->mapToGroups(function ($trainset_attachment_component) {
                    return [
                        $trainset_attachment_component->carriage_panel_component->component->id => [
                            'id' => $trainset_attachment_component->carriage_panel_component->component->id,
                            'component_name' => $trainset_attachment_component->carriage_panel_component->component->name,
                            'total_plan' => $trainset_attachment_component->total_plan,
                            'total_required' => $trainset_attachment_component->total_required,
                            'total_fulfilled' => $trainset_attachment_component->total_fulfilled,
                            'total_failed' => $trainset_attachment_component->total_failed,
                            'total_current_work_progress' => $trainset_attachment_component->total_current_work_progress,
                        ],
                    ];
                })->map(function ($components) {
                    return [
                        'id' => $components->first()['id'],
                        'component_name' => $components->first()['component_name'],
                        'total_plan' => $components->sum('total_plan'),
                        'total_required' => $components->sum('total_required'),
                        'total_fulfilled' => $components->sum('total_fulfilled'),
                        'total_failed' => $components->sum('total_failed'),
                        'total_current_work_progress' => $components->sum('total_current_work_progress'),
                    ];
                })->values();

                return [
                    'attachment_number' => $this->attachment_number,
                    'components' => $components,
                ];
            case IntentEnum::API_TRAINSET_ATTACHMENT_GET_ATTACHMENT_REQUIRED_COMPONENTS->value:
                $trainsetAttachment = $this->ancestor();
                $trainsetAttachmentComponents = $this->trainsetAttachmentComponentRepository
                    ->useFilters(array_merge_recursive($request->query(), [
                        'column_filters' => [
                            'trainset_attachment_id' => $trainsetAttachment->id,
                        ],
                    ]))->get();
                $components = $trainsetAttachmentComponents->filter(function ($trainset_attachment_component) {
                    return $trainset_attachment_component->total_fulfilled !== $trainset_attachment_component->total_required;
                })->map(function ($trainset_attachment_component) {
                    return [
                        'carriage_panel_component_id' => $trainset_attachment_component->carriage_panel_component_id,
                        'carriage' => CarriageResource::make($trainset_attachment_component->carriage_panel_component->carriage_panel->carriage_trainset->carriage),
                        'panel' => PanelResource::make($trainset_attachment_component->carriage_panel_component->carriage_panel->panel),
                        'component' => ComponentResource::make($trainset_attachment_component->carriage_panel_component->component),
                        'total_plan' => $trainset_attachment_component->total_plan,
                        'total_required' => $trainset_attachment_component->total_required,
                        'total_fulfilled' => $trainset_attachment_component->total_fulfilled,
                        'total_failed' => $trainset_attachment_component->total_failed,
                        'total_current_work_progress' => $trainset_attachment_component->total_current_work_progress,
                    ];
                });
                if (!isset($request->unique) || $request->get('unique') == true) {
                    $components = $components->unique('component');
                }
                $components = $components->values();

                return [
                    'attachment_number' => $this->attachment_number,
                    'components' => $components,
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
                    'is_ancestor' => $this->is_ancestor(),
                    'is_parent' => $this->is_parent(),
                    'is_child' => $this->is_child(),
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
                    'is_ancestor' => $this->is_ancestor(),
                    'is_parent' => $this->is_parent(),
                    'is_child' => $this->is_child(),
                    'ancestor' => $this->when($this->is_child() && $this->parent->is_child(), $this->ancestor()),
                    'parent' => $this->when($this->is_child(), $this->parent),
                    'childs' => $this->when($this->is_parent(), $this->childs),
                ];
            case IntentEnum::API_TRAINSET_ATTACHMENT_GET_ATTACHMENT_MATERIALS->value:
                $trainsetAttachment = $this->ancestor()->load(['trainset_attachment_components' => ['carriage_panel_component' => ['component_materials']]]);

                $materials = collect();
                $trainsetAttachment->trainset_attachment_components->map(function ($trainsetAttachmentComponent) use (&$materials) {
                    $trainsetAttachmentComponent->carriage_panel_component->component_materials->map(function ($componentMaterial) use (&$materials, $trainsetAttachmentComponent) {
                        $totalQty = $trainsetAttachmentComponent->total_required * $componentMaterial->qty;
                        $material = $materials->firstWhere('raw_material_id', $componentMaterial->raw_material_id);
                        if (!$material) {
                            $materials->push([
                                'raw_material_id' => $componentMaterial->raw_material_id,
                                'material_code' => $componentMaterial->raw_material->material_code,
                                'material_description' => $componentMaterial->raw_material->description,
                                'total_qty' => $totalQty,
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
            case IntentEnum::WEB_TRAINSET_ATTACHMENT_GET_ATTACHMENT_PROGRESS->value:
                $attachment = $this->ancestor();
                $components = $attachment->components()->distinct()->get();
                $attachmentProgress = $components->map(function ($component) use (&$componentSteps) {
                    return [
                        'component' => $component,
                        'carriage_panel_components' => collect(),
                    ];
                });
                $componentSteps = collect();
                $attachment->progresses()->distinct()->get()->map(function ($progress) use (&$componentSteps) {
                    $progress->progress_steps->map(function ($progressStep) use (&$componentSteps) {
                        $step = $componentSteps->firstWhere('id', $progressStep->step_id);
                        if (!$step) {
                            $componentSteps->push([
                                ...StepResource::make($progressStep->step)->only('id', 'name', 'process', 'estimated_time'),
                                'work_status' => null,
                                'localized_work_status' => null,
                            ]);
                        }
                    });
                });

                $attachment->trainset_attachment_components->map(function ($trainsetAttachmentComponent) use ($attachmentProgress, $componentSteps) {
                    $steps = collect();
                    $trainsetAttachmentComponent->detail_worker_trainsets->map(function ($detailWorkerTrainset) use (&$steps) {
                        $step = $steps->firstWhere('id', $detailWorkerTrainset->progress_step->step_id);
                        if (!$step) {
                            $steps->push([
                                ...StepResource::make($detailWorkerTrainset->progress_step->step)->only('id', 'name', 'process', 'estimated_time'),
                                'work_status' => $detailWorkerTrainset->work_status->value,
                                'localized_work_status' => $detailWorkerTrainset->work_status->getLabel(),
                            ]);
                        }
                    });
                    $componentSteps->each(function ($componentStep) use (&$steps) {
                        $step = $steps->firstWhere('id', $componentStep['id']);
                        if (!$step) {
                            $steps->push($componentStep);
                        }
                    });

                    $attachmentProgress->each(function ($attachmentProgress) use ($steps, &$componentSteps, $trainsetAttachmentComponent) {
                        if ($attachmentProgress['component']->id === $trainsetAttachmentComponent->carriage_panel_component->component_id) {
                            $attachmentProgress['carriage_panel_components']->push([
                                'carriage_panel_component_id' => $trainsetAttachmentComponent->carriage_panel_component_id,
                                'panel' => $trainsetAttachmentComponent->carriage_panel_component->carriage_panel->panel,
                                'carriage' => $trainsetAttachmentComponent->carriage_panel_component->carriage_panel->carriage_trainset->carriage,
                                'progress' => $trainsetAttachmentComponent->carriage_panel_component->progress->load('work_aspect'),
                                'total_steps' => $steps->count(),
                                'steps' => $steps->sortBy('id')->map(fn ($step) => $step)->values(),
                            ]);
                        }
                    });
                });

                return $attachmentProgress->toArray();
            case IntentEnum::WEB_TRAINSET_ATTACHMENT_GET_ATTACHMENT_PROGRESS_WITH_WORKER_STEPS->value:
                $attachment = $this->ancestor();
                $components = $attachment->components()->distinct()->get();
                $attachmentProgress = $components->map(function ($component) use (&$componentSteps) {
                    return [
                        'component' => $component,
                        'carriage_panel_components' => collect(),
                    ];
                });
                $componentSteps = collect();
                $attachment->progresses()->distinct()->get()->map(function ($progress) use (&$componentSteps) {
                    $progress->progress_steps->map(function ($progressStep) use (&$componentSteps) {
                        $step = $componentSteps->firstWhere('id', $progressStep->step_id);
                        if (!$step) {
                            $componentSteps->push([
                                ...StepResource::make($progressStep->step)->only(['id', 'name', 'process', 'estimated_time']),
                                'work_status' => null,
                                'localized_work_status' => null,
                                'workers' => collect(),
                            ]);
                        }
                    });
                });

                $attachment->trainset_attachment_components->map(function ($trainsetAttachmentComponent) use ($attachmentProgress, $componentSteps) {
                    $steps = collect();
                    $trainsetAttachmentComponent->detail_worker_trainsets->map(function ($detailWorkerTrainset) use (&$steps) {
                        $workers = collect();
                        $step = $steps->firstWhere('id', $detailWorkerTrainset->progress_step->step_id);
                        if (!$step) {
                            $workers->push([
                                'worker' => UserResource::make($detailWorkerTrainset->worker)->only('nip', 'name'),
                                ...collect(DetailWorkerTrainsetResource::make(
                                    $detailWorkerTrainset->fresh()
                                )->toArray(request()->merge(['intent' => '']))
                                )->only('id', 'acceptance_status', 'localized_acceptance_status', 'work_status', 'localized_work_status', 'created_at', 'updated_at'),
                            ]);
                            $steps->push([
                                ...StepResource::make($detailWorkerTrainset->progress_step->step)->only(['id', 'name', 'process', 'estimated_time']),
                                'work_status' => $detailWorkerTrainset->work_status->value,
                                'localized_work_status' => $detailWorkerTrainset->work_status->getLabel(),
                                'workers' => $workers,
                            ]);
                        } else {
                            $step['workers']->push([
                                'worker' => UserResource::make($detailWorkerTrainset->worker)->only('nip', 'name'),
                                ...collect(DetailWorkerTrainsetResource::make(
                                    $detailWorkerTrainset->fresh()
                                )->toArray(request()->merge(['intent' => '']))
                                )->only('id', 'acceptance_status', 'localized_acceptance_status', 'work_status', 'localized_work_status', 'created_at', 'updated_at'),
                            ]);
                        }
                    });
                    $componentSteps->each(function ($componentStep) use (&$steps) {
                        $step = $steps->firstWhere('id', $componentStep['id']);
                        if (!$step) {
                            $steps->push($componentStep);
                        }
                    });

                    $attachmentProgress->each(function ($attachmentProgress) use ($steps, &$componentSteps, $trainsetAttachmentComponent) {
                        if ($attachmentProgress['component']->id === $trainsetAttachmentComponent->carriage_panel_component->component_id) {
                            $attachmentProgress['carriage_panel_components']->push([
                                'carriage_panel_component_id' => $trainsetAttachmentComponent->carriage_panel_component_id,
                                'panel' => $trainsetAttachmentComponent->carriage_panel_component->carriage_panel->panel,
                                'carriage' => $trainsetAttachmentComponent->carriage_panel_component->carriage_panel->carriage_trainset->carriage,
                                'progress' => $trainsetAttachmentComponent->carriage_panel_component->progress->load('work_aspect'),
                                'total_steps' => $steps->count(),
                                'steps' => $steps->sortBy('id')->map(fn ($step) => $step)->values(),
                            ]);
                        }
                    });
                });

                return $attachmentProgress->toArray();
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
                    'qr' => $this->qr,
                    'status' => $this->status,
                    'elapsed_time' => $this->elapsed_time,
                    'supervisor_id' => $this->supervisor_id,
                    'supervisor' => UserResource::make($this->whenLoaded('supervisor')),
                    'trainset_attachment_id' => $this->trainset_attachment_id,
                    'trainset_attachment_handlers' => TrainsetAttachmentHandlerResource::collection($this->whenLoaded('trainset_attachment_handlers')),
                    'attachment_notes' => AttachmentNoteResource::collection($this->whenLoaded('attachment_notes')),
                    'raw_materials' => RawMaterialResource::collection($this->whenLoaded('raw_materials')),
                    'created_at' => $this->created_at->toDateTimeString(),
                    'updated_at' => $this->updated_at->toDateTimeString(),
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
