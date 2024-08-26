<?php

namespace App\Http\Resources;

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
            //
            //            case IntentEnum::WEB_PROJECT_GET_TRAINSETS->value:
            //                return [
            //                    'id' => $this->id,
            //                    'name' => $this->name,
            //                    'initial_date' => $this->initial_date,
            //                    'trainsets' => TrainsetResource::collection($this->whenLoaded('trainsets')),
            //                ];
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
