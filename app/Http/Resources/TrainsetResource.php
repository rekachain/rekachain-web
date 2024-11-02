<?php

namespace App\Http\Resources;

use App\Models\CarriagePanel;
use App\Models\CarriagePanelComponent;
use App\Models\CarriageTrainset;
use App\Support\Enums\IntentEnum;
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
            case IntentEnum::API_PANEL_ATTACHMENT_GET_ATTACHMENT_DETAILS->value:
                return [
                    'id' => $this->id,
                    'name' => $this->name,
                    'preset_trainset' => PresetTrainsetResource::make($this->preset_trainset),
                    'status' => $this->status,
                    'created_at' => $this->created_at,
                    'updated_at' => $this->updated_at,
                ];
            case IntentEnum::WEB_TRAINSET_GET_COMPONENT_MATERIALS_WITH_QTY->value:
                $componentId = $request->get('component_id');
                if (!$componentId) {
                    return $this->component_materials->load(['carriage_panel_component'])
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
                                    })
                                ];
                            })->sortBy('raw_material.id')->values(),
                        ];
                    })->sortBy('component.id')->toArray();
                } else {
                    return $this->component_materials()->where('component_id', $componentId)->get()
                        ->groupBy(['raw_material_id'])->map(function ($componentMaterials) {
                            return [
                                'raw_material' => RawMaterialResource::make($componentMaterials->first()->raw_material),
                                'total_qty' => $componentMaterials->sum(function ($componentMaterial) {
                                    return $componentMaterial->qty * $componentMaterial->carriage_panel_component->carriage_panel->carriage_trainset->qty;
                                })
                            ];
                    })->sortBy('raw_material.id')->toArray();
                }
            case IntentEnum::WEB_TRAINSET_GET_PANEL_MATERIALS_WITH_QTY->value:
                $carriageId = $request->get('carriage_id');
                $panelId = $request->get('panel_id');
                if (!$panelId && !$carriageId) {
                    return $this->panel_materials->load(['carriage_panel'])
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
                } else if ($panelId && !$carriageId) {
                    return $this->panel_materials()->where('panel_id', $panelId)->get()
                        ->groupBy(['raw_material_id'])->map(function ($panelMaterials) {
                            return [
                                'raw_material' => RawMaterialResource::make($panelMaterials->first()->raw_material),
                                'total_qty' => $panelMaterials->sum(function ($panelMaterial) {
                                    return $panelMaterial->qty * $panelMaterial->carriage_panel->carriage_trainset->qty;
                                }),
                            ];
                    })->sortBy('raw_material.id')->toArray();
                } else if (!$panelId && $carriageId) {
                    return $this->panel_materials()->with(['carriage_panel.carriage_trainset'])->where('carriage_id', $carriageId)->get()
                        ->groupBy(['raw_material_id'])->map(function ($panelMaterials) {
                            return [
                                'raw_material' => RawMaterialResource::make($panelMaterials->first()->raw_material),
                                'total_qty' => $panelMaterials->sum(function ($panelMaterial) {
                                    return $panelMaterial->qty * $panelMaterial->carriage_panel->carriage_trainset->qty;
                                }),
                            ];
                    })->sortBy('raw_material.id')->toArray();
                } else {
                    return $this->panel_materials()->with(['carriage_panel.carriage_trainset'])->where('carriage_id', $carriageId)->where('panel_id', $panelId)->get()
                        ->groupBy(['raw_material_id'])->map(function ($panelMaterials) {
                            return [
                                'raw_material' => RawMaterialResource::make($panelMaterials->first()->raw_material),
                                'total_qty' => $panelMaterials->sum(function ($panelMaterial) {
                                    return $panelMaterial->qty * $panelMaterial->carriage_panel->carriage_trainset->qty;
                                }),
                            ];
                    })->sortBy('raw_material.id')->toArray();
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
        }

        return [
            'id' => $this->id,
            'project_id' => $this->project_id,
            'project' => new ProjectResource($this->whenLoaded('project')),
            'name' => $this->name,
            'carriages' => CarriageResource::collection($this->whenLoaded('carriages')),
            'carriage_trainsets' => CarriageTrainsetResource::collection($this->whenLoaded('carriage_trainsets')),
            'preset_trainset' => PresetTrainsetResource::make($this->whenLoaded('preset_trainset')),
            'preset_trainset_id' => $this->preset_trainset_id,
            'preset_name' => $this->preset_trainset?->name,
            'status' => $this->status,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'can_be_deleted' => $this->canBeDeleted(),
            'has_mechanic_trainset_attachment' => $this->hasMechanicTrainsetAttachment(),
            'has_electric_trainset_attachment' => $this->hasElectricTrainsetAttachment(),
            'has_panel_attachment' => $this->hasPanelAttachment(),
        ];
    }
}
