<?php

namespace App\Http\Resources;

use App\Support\Enums\IntentEnum;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CarriageResource extends JsonResource {
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array {

        //        $intent = $request->get('intent');
        //
        //        switch ($intent) {
        //            case IntentEnum::WEB_PROJECT_GET_TRAINSETS->value:
        //                return [
        //                    'id' => $this->id,
        //                    'type' => $this->type,
        //                    'qty' => $this->pivot->qty,
        //                ];
        //        }

        return [
            'id' => $this->id,
            'type' => $this->type,
            'description' => $this->description,
            'carriage_panels' => CarriagePanelResource::collection($this->whenLoaded('carriage_panels')),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
