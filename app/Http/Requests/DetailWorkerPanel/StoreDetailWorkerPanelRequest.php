<?php

namespace App\Http\Requests\DetailWorkerPanel;

use App\Support\Enums\DetailWorkerPanelAcceptanceStatusEnum;
use App\Support\Enums\DetailWorkerPanelWorkStatusEnum;
use Illuminate\Foundation\Http\FormRequest;

class StoreDetailWorkerPanelRequest extends FormRequest {
    public function rules(): array {
        return [
            'serial_panel_id' => 'required|exists:serial_panels,id',
            'worker_id' => 'required|exists:users,id',
            'progress_step_id' => 'required|exists:progress_steps,id',
            'estimated_time' => 'required|integer',
            'work_status' => ['required', 'in:' . implode(',', array_column(DetailWorkerPanelWorkStatusEnum::cases(), 'value'))],
            'acceptance_status' => ['required', 'in:' . implode(',', array_column(DetailWorkerPanelAcceptanceStatusEnum::cases(), 'value'))],
            // Add your validation rules here
        ];
    }
}
