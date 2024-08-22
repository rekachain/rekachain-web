<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ComponentResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'panel' => PanelResource::make($this->whenLoaded('panel')),
            'progress' => ProgressResource::make($this->whenLoaded('progress')),
            'updated_at' => $this->updated_at,
        ];
    }
}
