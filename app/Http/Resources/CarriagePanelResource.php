<?php

namespace App\Http\Resources;

use App\Support\Enums\IntentEnum;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CarriagePanelResource extends JsonResource {
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
                    'progress' => new ProgressResource($this->progress),
                    'panel' => new PanelResource($this->panel),
                    'qty' => $this->qty,
                    'panel_materials' => PanelMaterialResource::collection($this->panel_materials),
                    'created_at' => $this->created_at,
                    'updated_at' => $this->updated_at,
                ];
        }

        return [
            'id' => $this->id,
            'panel' => new PanelResource($this->whenLoaded('panel')),
            'progress_id' => $this->progress_id,
            'carriage_trainset' => new CarriageTrainsetResource($this->whenLoaded('carriage_trainset')),
            'carriage_panel_components' => CarriagePanelComponentResource::collection($this->whenLoaded('carriage_panel_components')),
            'panel_materials' => PanelMaterialResource::collection($this->whenLoaded('panel_materials')),
            'qty' => $this->qty,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
