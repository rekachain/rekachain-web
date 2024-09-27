<?php

namespace App\Http\Resources;

use App\Support\Enums\IntentEnum;
use Illuminate\Http\Resources\Json\JsonResource;

class DetailWorkerPanelResource extends JsonResource {
    public function toArray($request): array {
        $intent = $request->get('intent');

        switch ($intent) {
            case IntentEnum::API_DETAIL_WORKER_PANEL_GET_DETAILS->value:
                return [
                    // 'attachment_number' => $this->attachment_number,
                    'worker' => $this->worker,
                    'attachment_number' => $this->serial_panel->panel_attachment,
                    'jenis_pekerjaan' => $this->progress_step->progress,
                    'estimated_time' => $this->estimated_time,
                    'work_status' => $this->work_status,
                    'acceptance_status' => $this->acceptance_status,
                ];
        }
        
        return [
            'worker' => $this->worker,
            'step' => $this->step,
            'estimated_time' => $this->estimated_time,
            'work_status' => $this->work_status,
            'acceptance_status' => $this->acceptance_status,
            'created_at' => $this->created_at->toDateTimeString(),
            'updated_at' => $this->updated_at->toDateTimeString(),
        ];
    }
}