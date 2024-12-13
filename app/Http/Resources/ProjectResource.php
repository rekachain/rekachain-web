<?php

namespace App\Http\Resources;

use App\Models\Carriage;
use App\Models\Trainset;
use App\Support\Enums\IntentEnum;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProjectResource extends JsonResource {
    protected $projectCarriage;

    public function projectCarriage(Carriage $projectCarriage) {
        $this->projectCarriage = $projectCarriage;

        return $this;
    }

    public function projectTrainset(Trainset $projectTrainset) {
        $this->projectTrainset = $projectTrainset;

        return $this;
    }

    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array {
        $intent = $request->get('intent');
        switch ($intent) {
            case IntentEnum::WEB_PROJECT_GET_ALL_CARRIAGES_WITH_QTY->value:
                return $this->carriage_trainsets->groupBy(['carriage_id'])->map(function ($cariageTrainsets) {
                    return [
                        'carriage' => CarriageResource::make($cariageTrainsets->first()->carriage),
                        'total_qty' => $cariageTrainsets->sum(function ($cariageTrainset) {
                            return $cariageTrainset->qty;
                        }),
                    ];
                })
                    ->paginate($request->get('pageSize', $request->get('per_page', 10)))
                    ->toArray();
            case IntentEnum::WEB_PROJECT_GET_ALL_PANELS_WITH_QTY->value:
                return $this->carriage_panels->groupBy(['panel_id'])->map(function ($carriagePanels) {
                    return [
                        'panel' => PanelResource::make($carriagePanels->first()->panel),
                        'has_materials' => $carriagePanels->filter(function ($carriagePanel) {
                            return $carriagePanel->hasMaterials();
                        })->isNotEmpty(),
                        'total_qty' => $carriagePanels->sum(function ($carriagePanel) {
                            return $carriagePanel->qty * $carriagePanel->carriage_trainset->qty;
                        }),
                    ];
                })
                    ->paginate($request->get('pageSize', $request->get('per_page', 10)))
                    ->toArray();
            case IntentEnum::WEB_PROJECT_GET_ALL_COMPONENTS_WITH_QTY->value:
                return $this->carriage_panel_components
                    ->groupBy(['component_id'])->map(function ($carriagePanelComponents) {
                        return [
                            'component' => ComponentResource::make($carriagePanelComponents->first()->component),
                            'has_materials' => $carriagePanelComponents->filter(function ($carriagePanelComponent) {
                                return $carriagePanelComponent->hasMaterials();
                            })->isNotEmpty(),
                            'total_qty' => $carriagePanelComponents->sum(function ($carriagePanelComponent) {
                                return $carriagePanelComponent->qty * $carriagePanelComponent->carriage_panel->qty * $carriagePanelComponent->carriage_panel->carriage_trainset->qty;
                            }),
                        ];
                    })
                    ->paginate($request->get('pageSize', $request->get('per_page', 10)))
                    ->toArray();
            case IntentEnum::WEB_PROJECT_GET_ALL_CARRIAGE_COMPONENTS_WITH_QTY->value:
                return $this->carriage_panel_components()->whereCarriageId($this->projectCarriage->id)->get()
                    ->groupBy(['component_id'])->map(function ($carriageComponents) {
                        return [
                            'component' => ComponentResource::make($carriageComponents->first()->component),
                            'has_materials' => $carriageComponents->filter(function ($carriageComponent) {
                                return $carriageComponent->hasMaterials();
                            })->isNotEmpty(),
                            'total_qty' => $carriageComponents->sum(function ($carriageComponents) {
                                return $carriageComponents->qty * $carriageComponents->carriage_panel->qty * $carriageComponents->carriage_panel->carriage_trainset->qty;
                            }),
                        ];
                    })
                    ->paginate($request->get('pageSize', $request->get('per_page', 10)))
                    ->toArray();
            case IntentEnum::WEB_PROJECT_GET_ALL_CARRIAGE_PANELS_WITH_QTY->value:
                return $this->carriage_panels()->whereCarriageId($this->projectCarriage->id)->get()
                    ->groupBy(['panel_id'])->map(function ($carriagePanels) {
                        return [
                            'panel' => PanelResource::make($carriagePanels->first()->panel),
                            'has_materials' => $carriagePanels->filter(function ($carriagePanel) {
                                return $carriagePanel->hasMaterials();
                            })->isNotEmpty(),
                            'total_qty' => $carriagePanels->sum(function ($carriagePanel) {
                                return $carriagePanel->qty * $carriagePanel->carriage_trainset->qty;
                            }),
                        ];
                    })
                    ->paginate($request->get('pageSize', $request->get('per_page', 10)))
                    ->toArray();
            case IntentEnum::WEB_PROJECT_GET_ALL_TRAINSET_COMPONENTS_WITH_QTY->value:
                return $this->carriage_panel_components()->whereTrainsetId($this->projectTrainset->id)->get()
                    ->groupBy(['component_id'])->map(function ($carriageComponents) {
                        return [
                            'component' => ComponentResource::make($carriageComponents->first()->component),
                            'has_materials' => $carriageComponents->filter(function ($carriageComponent) {
                                return $carriageComponent->hasMaterials();
                            })->isNotEmpty(),
                            'total_qty' => $carriageComponents->sum(function ($carriageComponents) {
                                return $carriageComponents->qty * $carriageComponents->carriage_panel->qty * $carriageComponents->carriage_panel->carriage_trainset->qty;
                            }),
                        ];
                    })
                    ->paginate($request->get('pageSize', $request->get('per_page', 10)))
                    ->toArray();
            case IntentEnum::WEB_PROJECT_GET_ALL_TRAINSET_PANELS_WITH_QTY->value:
                return $this->carriage_panels()->whereTrainsetId($this->projectTrainset->id)->get()
                    ->groupBy(['panel_id'])->map(function ($carriagePanels) {
                        return [
                            'panel' => PanelResource::make($carriagePanels->first()->panel),
                            'has_materials' => $carriagePanels->filter(function ($carriagePanel) {
                                return $carriagePanel->hasMaterials();
                            })->isNotEmpty(),
                            'total_qty' => $carriagePanels->sum(function ($carriagePanel) {
                                return $carriagePanel->qty * $carriagePanel->carriage_trainset->qty;
                            }),
                        ];
                    })
                    ->paginate($request->get('pageSize', $request->get('per_page', 10)))
                    ->toArray();
                // idonknowwhyisthishere💀 seemssavetodeletebutmeh🗿
                // case IntentEnum::API_PANEL_ATTACHMENT_GET_ATTACHMENT_DETAILS->value:
                //     return [
                //         'id' => $this->id,
                //         'name' => $this->name,
                //         'initial_date' => $this->initial_date,
                //         'trainset_count' => $this->trainsets?->count(),
                //         'created_at' => $this->created_at,
                //         'updated_at' => $this->updated_at,
                //     ];
                // case IntentEnum::API_PANEL_ATTACHMENT_GET_ATTACHMENT_SERIAL_NUMBER_DETAILS->value:
                //     return [
                //         'id' => $this->id,
                //         'name' => $this->name,
                //         'initial_date' => $this->initial_date,
                //         'created_at' => $this->created_at,
                //         'updated_at' => $this->updated_at,
                //     ];
        }

        return [
            'id' => $this->id,
            'name' => $this->name,
            'initial_date' => $this->initial_date,
            'trainset_count' => $this->whenCounted('trainsets'),
            'trainsets' => TrainsetResource::collection($this->whenLoaded('trainsets')),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'can_be_deleted' => $this->canBeDeleted(),
        ];
    }
}
