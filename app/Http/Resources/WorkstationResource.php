<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class WorkstationResource extends JsonResource {
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'location' => $this->location,
            'workshop' => new WorkshopResource($this->whenLoaded('workshop')),
            'division' => new DivisionResource($this->whenLoaded('division')),
            'can_be_deleted' => $this->canBeDeleted(),
        ];
    }
}
