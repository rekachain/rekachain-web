<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CarriagePanelResource extends JsonResource
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
            'progress_id' => $this->progress_id,
            'carriage_id' => $this->carriage_id,
            'panel_id' => $this->panel_id,
            'panel' => new PanelResource($this->whenLoaded('panel')),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}