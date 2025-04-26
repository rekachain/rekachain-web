<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ScanFaceResource extends JsonResource {
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array {
        return [
            'id' => $this->id,
            'user' => new UserResource($this->user),
            'step' => new StepResource($this->user->step),
            'kpm' => $this->kpm,
            'panel' => $this->panel,
            'image_path' => $this->image_path,
            'url_path' => url("result_scan_faces/" . $this->image_path),
            'status' => $this->status,
            'created_at' => $this->created_at,
        ];
    }
}
