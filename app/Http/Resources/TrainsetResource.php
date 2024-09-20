<?php

namespace App\Http\Resources;

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
        ];
    }
}
