<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TrainsetCarriagesResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        // return [
        //     'anjing'
        // ];
        // return parent::toArray($request);

        return [
            'id' => $request->id,
            'trainset_id' => $request->trainset_id,
            'carriage_id' => $request->carriage_id,
            'qty' => $request->qty,
        ];
    }
}
