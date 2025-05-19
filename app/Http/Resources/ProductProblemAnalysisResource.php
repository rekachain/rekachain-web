<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ProductProblemAnalysisResource extends JsonResource {
    public function toArray($request): array {
        return [
            'id' => $this->id,
            'componenr_name' => $this->component_name,
            'date_range' => $this->date_range,
            'summary' => $this->summary,
            'cause' => $this->cause,
            'solution' => $this->solution,
            'created_at' => $this->created_at->toDateTimeString(),
            'updated_at' => $this->updated_at->toDateTimeString(),
        ];
    }
}