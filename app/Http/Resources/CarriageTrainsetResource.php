<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CarriageTrainsetResource extends JsonResource {
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array {
        return [
            'id' => $this->id,
            'qty' => $this->qty,
            'carriage' => new CarriageResource($this->whenLoaded('carriage')),
            'trainset' => new TrainsetResource($this->whenLoaded('trainset')),
        ];
    }
}
