<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SerialPanelResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'serial_number' => $this->id,
            // 'panel_attachment_id' => $this->panel_attachment_id,
            'qr_code' => $this->qr_code,
            'qr_path' => $this->qr_path,
        ];
    }
}
