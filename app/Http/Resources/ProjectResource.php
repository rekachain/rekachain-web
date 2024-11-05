<?php

namespace App\Http\Resources;

use App\Support\Enums\IntentEnum;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProjectResource extends JsonResource {
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array {
        $intent = $request->get('intent');
        switch ($intent) {
            case IntentEnum::WEB_PROJECT_GET_ALL_PANELS_WITH_QTY->value:
                return $this->carriage_panels->groupBy(['panel_id'])->map(function ($carriagePanels) {
                    return [
                        'panel' => PanelResource::make($carriagePanels->first()->panel),
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
                            'total_qty' => $carriagePanelComponents->sum(function ($carriagePanelComponent) {
                                return $carriagePanelComponent->qty * $carriagePanelComponent->carriage_panel->qty * $carriagePanelComponent->carriage_panel->carriage_trainset->qty;
                            }),
                        ];
                    })->toArray();
            case IntentEnum::API_PANEL_ATTACHMENT_GET_ATTACHMENT_DETAILS->value:
                return [
                    'id' => $this->id,
                    'name' => $this->name,
                    'initial_date' => $this->initial_date,
                    'trainset_count' => $this->trainsets?->count(),
                    'created_at' => $this->created_at,
                    'updated_at' => $this->updated_at,
                ];
            case IntentEnum::API_PANEL_ATTACHMENT_GET_ATTACHMENT_SERIAL_NUMBER_DETAILS->value:
                return [
                    'id' => $this->id,
                    'name' => $this->name,
                    'initial_date' => $this->initial_date,
                    'created_at' => $this->created_at,
                    'updated_at' => $this->updated_at,
                ];
        }

        return [
            'id' => $this->id,
            'name' => $this->name,
            'initial_date' => $this->initial_date,
            'trainset_count' => $this->trainsets?->count(),
            //            'trainsets' => $this->whenLoaded('trainsets', fn() => TrainsetResource::collection($this->trainsets)),
            'trainsets' => TrainsetResource::collection($this->whenLoaded('trainsets')),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'can_be_deleted' => $this->canBeDeleted(),
        ];
    }
}
