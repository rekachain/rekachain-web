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
