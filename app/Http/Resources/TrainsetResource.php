<?php

namespace App\Http\Resources;

use App\Models\CarriagePanel;
use App\Models\CarriagePanelComponent;
use App\Models\CarriageTrainset;
use App\Models\PanelAttachment;
use App\Support\Enums\DetailWorkerTrainsetWorkStatusEnum;
use App\Support\Enums\IntentEnum;
use App\Support\Enums\SerialPanelManufactureStatusEnum;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TrainsetResource extends JsonResource {
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array {
        $intent = $request->get('intent');

        switch ($intent) {
            case IntentEnum::WEB_TRAINSET_GET_ALL_COMPONENTS_PROGRESS->value:
                $componentPlans = $this->carriage_panel_components
                    ->groupBy('component_id')->map(function ($carriagePanelComponents){
                    return [
                        'component' => $carriagePanelComponents->first()->component,
                        'total_plan_qty' => $carriagePanelComponents->sum(function ($carriagePanelComponent){
                            return $carriagePanelComponent->qty * $carriagePanelComponent->carriage_panel->qty * $carriagePanelComponent->carriage_panel->carriage_trainset->qty;
                        }),
                    ];
                });
                $fulfilledComponents = $this->trainset_attachment_components
                    ->groupBy('carriage_panel_component.component_id')->map(function ($trainsetAttachmentComponents) {
                    return [
                        'component' => $trainsetAttachmentComponents->first(),
                        'total_fulfilled_qty' => $trainsetAttachmentComponents->sum('total_fulfilled'),
                    ];
                });
                $progressComponents = $this->trainset_attachment_components
                    ->groupBy('carriage_panel_component.component_id')->map(function ($trainsetAttachmentComponents) {
                    return [
                        'component' => $trainsetAttachmentComponents->first(),
                        'total_progress_qty' => $trainsetAttachmentComponents->sum(function ($trainsetAttachmentComponent) {
                            if ($trainsetAttachmentComponent->detail_worker_trainsets->isNotEmpty()) {
                                $progressSteps = $trainsetAttachmentComponent->progress_steps;
                                $lastWorker = $trainsetAttachmentComponent->detail_worker_trainsets->last();
                                $isLastProgressStep = $progressSteps->last()->id === $lastWorker->progress_step->id;
                                return !$isLastProgressStep ? 1 : (($lastWorker->work_status === DetailWorkerTrainsetWorkStatusEnum::IN_PROGRESS) ? 1 : 0);
                            }
                            return 0;
                        }),
                    ];
                });
                $data = $componentPlans->map(function ($componentPlan) use ($fulfilledComponents, $progressComponents) {
                    $componentPlan['total_fulfilled_qty'] = $fulfilledComponents->get($componentPlan['component']->id)['total_fulfilled_qty'] ?? 0;
                    $componentPlan['total_progress_qty'] = $progressComponents->get($componentPlan['component']->id)['total_progress_qty'] ?? 0;
                    $componentPlan['diff'] = $componentPlan['total_plan_qty'] - $componentPlan['total_fulfilled_qty'] - $componentPlan['total_progress_qty'];
                    return $componentPlan;
                })->values();
                return $data->toArray();
            case IntentEnum::WEB_TRAINSET_GET_ALL_PANELS_PROGRESS->value:
                $panelPlans = $this->carriage_panels
                    ->groupBy('panel_id')->map(function ($carriagePanels){
                    return [
                        'panel' => $carriagePanels->first()->panel,
                        'total_plan_qty' => $carriagePanels->sum(function ($carriagePanel){
                            return $carriagePanel->qty * $carriagePanel->carriage_trainset->qty;
                        }),
                    ];
                });
                $fulfilledPanels = $this->serial_panels
                    ->groupBy('panel_attachment.carriage_panel.panel_id')->map(function ($serialPanels) {
                    return [
                        'panel' => $serialPanels->first(),
                        'total_fulfilled_qty' => $serialPanels->sum(function ($serialPanel) {
                            if ($serialPanel->manufacture_status === SerialPanelManufactureStatusEnum::COMPLETED) return 1;
                        }),
                    ];
                });
                $progressPanels = $this->serial_panels
                    ->groupBy('panel_attachment.carriage_panel.panel_id')->map(function ($serialPanels) {
                    return [
                        'panel' => $serialPanels->first(),
                        'total_progress_qty' => $serialPanels->sum(function ($serialPanel) {
                            if ($serialPanel->manufacture_status === SerialPanelManufactureStatusEnum::IN_PROGRESS 
                                || $serialPanel->manufacture_status === SerialPanelManufactureStatusEnum::FAILED) return 1;
                        }),
                    ];
                });
                $data = $panelPlans->map(function ($panelPlan) use ($fulfilledPanels, $progressPanels) {
                    $panelPlan['total_fulfilled_qty'] = $fulfilledPanels->get($panelPlan['panel']->id)['total_fulfilled_qty'] ?? 0;
                    $panelPlan['total_progress_qty'] = $progressPanels->get($panelPlan['panel']->id)['total_progress_qty'] ?? 0;
                    $panelPlan['diff'] = $panelPlan['total_plan_qty'] - $panelPlan['total_fulfilled_qty'] - $panelPlan['total_progress_qty'];
                    return $panelPlan;
                })->values();
                return $data->toArray();
            case IntentEnum::API_PANEL_ATTACHMENT_GET_ATTACHMENT_DETAILS->value:
                return [
                    'id' => $this->id,
                    'name' => $this->name,
                    'preset_trainset' => PresetTrainsetResource::make($this->preset_trainset),
                    'status' => $this->status,
                    'localized_status' => $this->status->getLabel(),
                    'created_at' => $this->created_at,
                    'updated_at' => $this->updated_at,
                ];
            case IntentEnum::WEB_TRAINSET_GET_ALL_COMPONENTS->value:
                $divisionId = $request->get('division_id') ?? 1; // default mechanic
                $components = $this->components()->whereHas('carriage_panel_components.progress.work_aspect', function (Builder $query) use ($divisionId) {
                    $query->where('division_id', $divisionId);
                });

                return $components->get()
                    ->groupBy(['id'])->map(function ($components) {
                        return ComponentResource::make($components->first());
                    })->toArray();
            case IntentEnum::WEB_TRAINSET_GET_ALL_COMPONENTS_WITH_QTY->value:
                $divisionId = $request->get('division_id') ?? 1; // default mechanic
                $carriagePanelComponents = $this->carriage_panel_components()->whereHas('progress.work_aspect', function (Builder $query) use ($divisionId) {
                    $query->where('division_id', $divisionId);
                });

                return $carriagePanelComponents->get()
                    ->groupBy(['component_id'])->map(function ($components) {
                        return [
                            'component' => ComponentResource::make($components->first()->component),
                            'total_qty' => $components->sum(function ($component) {
                                return $component->qty * $component->carriage_panel->qty * $component->carriage_panel->carriage_trainset->qty;
                            }),
                        ];
                    })->toArray();
            case IntentEnum::WEB_TRAINSET_GET_COMPONENT_MATERIALS_WITH_QTY->value:
                $componentMaterials = $this->component_materials()->with(['carriage_panel_component.carriage_panel.carriage_trainset']);
                $divisionId = $request->get('division_id') ?? 1; // default mechanic
                $componentMaterials = $componentMaterials->whereHas('carriage_panel_component.progress.work_aspect', function (Builder $query) use ($divisionId) {
                    $query->where('division_id', $divisionId);
                });
                $joinComponents = $request->get('join_components') ?? true;
                $carriageId = $request->get('carriage_id');
                $panelId = $request->get('panel_id');
                $componentId = $request->get('component_id');

                if ($carriageId) {
                    $componentMaterials = $componentMaterials->where('carriage_id', $carriageId);
                }
                if ($panelId) {
                    $componentMaterials = $componentMaterials->where('panel_id', $panelId);
                }
                if (!$componentId) {
                    if ($joinComponents === true) {
                        return $componentMaterials->get()
                            ->groupBy(['raw_material_id'])->map(function ($componentMaterials) {
                                return [
                                    'raw_material' => RawMaterialResource::make($componentMaterials->first()->raw_material),
                                    'total_qty' => $componentMaterials->sum(function ($componentMaterial) {
                                        return $componentMaterial->qty * $componentMaterial->carriage_panel_component->carriage_panel->carriage_trainset->qty;
                                    }),
                                ];
                            })->sortBy('raw_material.id')->toArray();
                    } else {
                        return $componentMaterials->get()
                            ->groupBy('carriage_panel_component.component_id')->map(function ($components) {
                                return [
                                    'component' => ComponentResource::make($components->first()->carriage_panel_component->component),
                                    'raw_materials' => $components->groupBy(['raw_material_id'])->map(function ($componentMaterials) {
                                        return [
                                            'raw_material' => RawMaterialResource::make($componentMaterials->first()->raw_material),
                                            'total_qty' => $componentMaterials->sum(function ($componentMaterial) {
                                                return $componentMaterial->qty * $componentMaterial->carriage_panel_component->qty
                                                * $componentMaterial->carriage_panel_component->carriage_panel->qty
                                                * $componentMaterial->carriage_panel_component->carriage_panel->carriage_trainset->qty;
                                            }),
                                        ];
                                    })->sortBy('raw_material.id')->values(),
                                ];
                            })->sortBy('component.id')->toArray();
                    }
                } else {
                    return $componentMaterials->where('component_id', $componentId)->get()
                        ->groupBy(['raw_material_id'])->map(function ($componentMaterials) {
                            return [
                                'raw_material' => RawMaterialResource::make($componentMaterials->first()->raw_material),
                                'total_qty' => $componentMaterials->sum(function ($componentMaterial) {
                                    return $componentMaterial->qty * $componentMaterial->carriage_panel_component->carriage_panel->carriage_trainset->qty;
                                }),
                            ];
                        })->sortBy('raw_material.id')->toArray();
                }
            case IntentEnum::WEB_TRAINSET_GET_ALL_PANELS_WITH_QTY->value:
                return $this->carriage_panels->groupBy(['panel_id'])->map(function ($carriagePanels) {
                    return [
                        'panel' => PanelResource::make($carriagePanels->first()->panel),
                        'total_qty' => $carriagePanels->sum(function ($carriagePanel) {
                            return $carriagePanel->qty * $carriagePanel->carriage_trainset->qty;
                        }),
                    ];
                })->toArray();
            case IntentEnum::WEB_TRAINSET_GET_PANEL_MATERIALS_WITH_QTY->value:
                $panelMaterials = $this->panel_materials()->with(['carriage_panel.carriage_trainset']);
                $carriageId = $request->get('carriage_id');
                $panelId = $request->get('panel_id');

                if ($carriageId) {
                    $panelMaterials = $panelMaterials->where('carriage_id', $carriageId);
                }
                if ($panelId) {
                    return $panelMaterials->where('panel_id', $panelId)->get()
                        ->groupBy(['raw_material_id'])->map(function ($panelMaterials) {
                            return [
                                'raw_material' => RawMaterialResource::make($panelMaterials->first()->raw_material),
                                'total_qty' => $panelMaterials->sum(function ($panelMaterial) {
                                    return $panelMaterial->qty * $panelMaterial->carriage_panel->carriage_trainset->qty;
                                }),
                            ];
                        })->sortBy('raw_material.id')->toArray();
                } else {
                    return $panelMaterials->get()
                        ->groupBy('carriage_panel.panel_id')->map(function ($panels) {
                            return [
                                'panel' => PanelResource::make($panels->first()->carriage_panel->panel),
                                'raw_materials' => $panels->groupBy(['raw_material_id'])->map(function ($panelMaterials) {
                                    return [
                                        'raw_material' => RawMaterialResource::make($panelMaterials->first()->raw_material),
                                        'total_qty' => $panelMaterials->sum(function ($panelMaterial) {
                                            return $panelMaterial->qty * $panelMaterial->carriage_panel->carriage_trainset->qty;
                                        }),
                                    ];
                                })->sortBy('raw_material.id')->values(),
                            ];
                        })->sortBy('panel.id')->toArray();
                }
            case IntentEnum::WEB_TRAINSET_GET_COMPONENTS->value:
                $trainset = $this->load(['carriage_trainsets' => ['carriage_panels' => ['carriage_panel_components']]])->findOrFail(request()->route('trainset'));

                $componentQuantities = collect();

                $trainset->carriage_trainsets->each(function (CarriageTrainset $carriageTrainset) use (&$componentQuantities) {
                    $carriageTrainset->carriage_panels->each(function (CarriagePanel $carriagePanel) use ($carriageTrainset, &$componentQuantities) {
                        $carriagePanel->carriage_panel_components->each(function (CarriagePanelComponent $component) use ($carriageTrainset, $carriagePanel, &$componentQuantities) {
                            $totalQty = $carriageTrainset->qty * $carriagePanel->qty * $component->qty;
                            $componentQuantities->push([
                                'component_id' => $component->component_id,
                                'component' => \App\Http\Resources\ComponentResource::make($component->component),
                                'total_qty' => $totalQty,
                            ]);
                        });
                    });
                });

                $mergedComponents = $componentQuantities->groupBy('component_id')->map(function ($group) {
                    return [
                        'component_id' => $group->first()['component_id'],
                        'component' => $group->first()['component'],
                        'total_qty' => $group->sum('total_qty'),
                    ];
                })->values();

                return ['components' => $mergedComponents->toArray()];
            case IntentEnum::WEB_TRAINSET_GET_PANEL_PROGRESS->value:
                $attachments = $this->panel_attachments->map(function (PanelAttachment $panelAttachment) {
                    if ($panelAttachment->is_ancestor()) {
                        return $panelAttachment;
                    }
                });
                $panelProgress = $attachments->map(function (PanelAttachment $attachment) {
                    $panelSteps = $attachment->progress->progress_steps->map(function ($progressStep) use (&$panelSteps) {
                        return [
                            ...StepResource::make($progressStep->step)->only(['id', 'name', 'process', 'estimated_time']),
                            'work_status' => null,
                            'localized_work_status' => null,
                        ];
                    });

                    $serialPanels = $attachment->serial_panels->map(function ($serialPanel) use ($panelSteps) {
                        $steps = collect();
                        $serialPanel->detail_worker_panels->map(function ($detailWorkerPanel) use (&$steps) {
                            $step = $steps->firstWhere('id', $detailWorkerPanel->progress_step->step_id);
                            if (!$step) {
                                $steps->push([
                                    ...StepResource::make($detailWorkerPanel->progress_step->step)->only(['id', 'name', 'process', 'estimated_time']),
                                    'work_status' => $detailWorkerPanel->work_status->value,
                                    'localized_work_status' => $detailWorkerPanel->work_status->getLabel(),
                                ]);
                            }
                        });
                        logger($steps);
                        $panelSteps->each(function ($panelStep) use (&$steps) {
                            $step = $steps->firstWhere('id', $panelStep['id']);
                            if (!$step) {
                                $steps->push($panelStep);
                            }
                        });

                        return [
                            'serial_number' => $serialPanel->id,
                            'product_no' => $serialPanel->product_no,
                            'steps' => $steps->sortBy('id')->map(fn ($step) => $step)->values(),
                        ];
                    });

                    return [
                        'panel' => $attachment->carriage_panel->panel,
                        'carriage' => $attachment->carriage_panel->carriage_trainset->carriage,
                        'progress' => $attachment->carriage_panel->progress->fresh()->load('work_aspect'),
                        'total_steps' => $panelSteps->count(),
                        'serial_panels' => $serialPanels,
                    ];
                });

                return $panelProgress->toArray();
            case IntentEnum::WEB_TRAINSET_GET_PANEL_PROGRESS_WITH_WORKER_STEPS->value:
                $attachments = $this->panel_attachments->map(function (PanelAttachment $panelAttachment) {
                    if ($panelAttachment->is_ancestor()) {
                        return $panelAttachment;
                    }
                });
                $panelProgress = $attachments->map(function (PanelAttachment $attachment) {
                    $panelSteps = $attachment->progress->progress_steps->map(function ($progressStep) use (&$panelSteps) {
                        return [
                            ...StepResource::make($progressStep->step)->only(['id', 'name', 'process', 'estimated_time']),
                            'work_status' => null,
                            'localized_work_status' => null,
                            'workers' => collect(),
                        ];
                    });

                    $serialPanels = $attachment->serial_panels->map(function ($serialPanel) use ($panelSteps) {
                        $steps = collect();
                        $serialPanel->detail_worker_panels->map(function ($detailWorkerPanel) use (&$steps) {
                            $workers = collect();
                            $step = $steps->firstWhere('id', $detailWorkerPanel->progress_step->step_id);
                            if (!$step) {
                                $workers->push([
                                    'worker' => UserResource::make($detailWorkerPanel->worker)->only('nip', 'name'),
                                    ...collect(DetailWorkerPanelResource::make(
                                        $detailWorkerPanel->fresh()
                                    )->toArray(request()->merge(['intent' => '']))
                                    )->only('id', 'acceptance_status', 'localized_acceptance_status', 'work_status', 'localized_work_status', 'created_at', 'updated_at')
                                ]);
                                $steps->push([
                                    ...StepResource::make($detailWorkerPanel->progress_step->step)->only(['id', 'name', 'process', 'estimated_time']),
                                    'work_status' => $detailWorkerPanel->work_status->value,
                                    'localized_work_status' => $detailWorkerPanel->work_status->getLabel(),
                                    'workers' => $workers,
                                ]);
                            } else {
                                $step['workers']->push([
                                    'worker' => UserResource::make($detailWorkerPanel->worker)->only('nip', 'name'),
                                    ...collect(DetailWorkerPanelResource::make(
                                        $detailWorkerPanel->fresh()
                                    )->toArray(request()->merge(['intent' => '']))
                                    )->only('id', 'acceptance_status', 'localized_acceptance_status', 'work_status', 'localized_work_status', 'created_at', 'updated_at')
                                ]);
                            }
                        });
                        $panelSteps->each(function ($panelStep) use (&$steps) {
                            $step = $steps->firstWhere('id', $panelStep['id']);
                            if (!$step) {
                                $steps->push($panelStep);
                            }
                        });

                        return [
                            'serial_number' => $serialPanel->id,
                            'product_no' => $serialPanel->product_no,
                            'steps' => $steps->sortBy('id')->map(fn ($step) => $step)->values(),
                        ];
                    });

                    return [
                        'panel' => $attachment->carriage_panel->panel,
                        'carriage' => $attachment->carriage_panel->carriage_trainset->carriage,
                        'progress' => $attachment->carriage_panel->progress->fresh()->load('work_aspect'),
                        'total_steps' => $panelSteps->count(),
                        'serial_panels' => $serialPanels,
                    ];
                });

                return $panelProgress->toArray();
        }

        return [
            'id' => $this->id,
            'project_id' => $this->project_id,
            'project' => new ProjectResource($this->whenLoaded('project')),
            'name' => $this->name,
            'trainset_attachments' => TrainsetAttachmentResource::collection($this->whenLoaded('trainset_attachments')),
            'panel_attachments' => PanelAttachmentResource::collection($this->whenLoaded('panel_attachments')),
            'carriages' => CarriageResource::collection($this->whenLoaded('carriages')),
            'carriage_trainsets' => CarriageTrainsetResource::collection($this->whenLoaded('carriage_trainsets')),
            'preset_trainset' => PresetTrainsetResource::make($this->whenLoaded('preset_trainset')),
            'preset_trainset_id' => $this->preset_trainset_id,
            'preset_name' => $this->preset_trainset?->name,
            'status' => $this->status,
            'localized_status' => $this->status->getLabel(),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'can_be_deleted' => $this->canBeDeleted(),
            'has_mechanic_trainset_attachment' => $this->hasMechanicTrainsetAttachment(),
            'has_electric_trainset_attachment' => $this->hasElectricTrainsetAttachment(),
            'has_panel_attachment' => $this->hasPanelAttachment(),
        ];
    }
}
