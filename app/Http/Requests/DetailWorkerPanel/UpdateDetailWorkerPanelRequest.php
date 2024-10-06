<?php

namespace App\Http\Requests\DetailWorkerPanel;

use App\Support\Enums\IntentEnum;
use Illuminate\Foundation\Http\FormRequest;
use App\Support\Enums\DetailWorkerPanelWorkStatusEnum;
use App\Support\Enums\DetailWorkerPanelAcceptanceStatusEnum;

class UpdateDetailWorkerPanelRequest extends FormRequest {
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    
    public function rules(): array {
        $intent = request()->get('intent');
        switch ($intent) {
            case IntentEnum::API_DETAIL_WORKER_PANEL_ACCEPT_PANEL->value:
                
                return [ 
                    'serial_panel_id' => 'nullable|exists:serial_panels,id',
                ];
            
        }    
            
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