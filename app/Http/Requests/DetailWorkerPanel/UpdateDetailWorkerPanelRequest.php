<?php

namespace App\Http\Requests\DetailWorkerPanel;

use Illuminate\Foundation\Http\FormRequest;
use App\Support\Enums\DetailWorkerPanelWorkStatusEnum;
use App\Support\Enums\DetailWorkerPanelAcceptanceStatusEnum;

class UpdateDetailWorkerPanelRequest extends FormRequest {
    public function rules(): array {
        return [
            'serial_panel_id' => 'nullable|exists:serial_panels,id',
            'worker_id' => 'nullable|exists:users,id',
            'progress_step_id' => 'nullable|exists:progress_steps,id',
            'estimated_time' => 'nullable|integer',
            'work_status' => ['nullable', 'in:' . implode(',', array_column(DetailWorkerPanelWorkStatusEnum::cases(), 'value'))],
            'acceptance_status' => ['nullable', 'in:' . implode(',', array_column(DetailWorkerPanelAcceptanceStatusEnum::cases(), 'value'))],
            // Add your validation rules here
        ];
    }
}
