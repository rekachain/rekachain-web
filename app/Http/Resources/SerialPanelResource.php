<?php

namespace App\Http\Resources;

use App\Support\Enums\IntentEnum;
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
        $intent = $request->get('intent');

        switch ($intent) {
            case IntentEnum::API_PANEL_ATTACHMENT_SERIAL_NUMBER->value:
                return [
                    'serial_number' => $this->id,
                    'panel' => $this->panel_attachment?->carriage_panel->panel->name,
                    'carriage' => $this->panel_attachment?->carriage_trainset->carriage->type,
                ];
        }
        return [
            'serial_number' => $this->id,
            // 'panel_attachment_id' => $this->panel_attachment_id,
            'qr_code' => $this->qr_code,
            'qr_path' => $this->qr_path,
        ];
    }
}
