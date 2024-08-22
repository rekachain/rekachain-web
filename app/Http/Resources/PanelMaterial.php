<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PanelMaterial extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        // return parent::toArray($request);
        return  [
            'id' => $this->id,
            'panel_id' => $this->panel_id,
            'progress_id' => $this->progress_id,
            'qty' => $this->qty,
        ];
    }
}
