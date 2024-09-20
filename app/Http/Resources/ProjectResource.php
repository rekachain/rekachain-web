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
