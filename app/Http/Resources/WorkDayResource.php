<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class WorkDayResource extends JsonResource {
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array {
        return [
            'id' => $this->id,
            'day' => $this->day,
            'work_day_times' => WorkDayTimeResource::collection($this->whenLoaded('work_day_times')),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'can_be_deleted' => $this->canBeDeleted(),
            'start_time' => $this->work_day_times->min('start_time'),
            'end_time' => $this->work_day_times->max('end_time'),
        ];
    }
}
