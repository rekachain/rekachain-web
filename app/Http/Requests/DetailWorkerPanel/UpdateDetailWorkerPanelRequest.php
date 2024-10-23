<?php

namespace App\Http\Requests\DetailWorkerPanel;

use App\Support\Enums\IntentEnum;
use App\Support\Enums\RoleEnum;
use Illuminate\Foundation\Http\FormRequest;
use App\Support\Enums\DetailWorkerPanelWorkStatusEnum;
use App\Support\Enums\DetailWorkerPanelAcceptanceStatusEnum;
use Illuminate\Support\Facades\Auth;

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
        $intent = $this->get('intent');
        switch ($intent){
            case IntentEnum::API_DETAIL_WORKER_PANEL_ASSIGN_REQUEST_WORKER->value:
                return [
                    'intent' => ['nullable', 'in:' . implode(',', array_column(IntentEnum::cases(), 'value'))],
                    'acceptance_status' => ['nullable', 'in:' . implode(',', array_column(DetailWorkerPanelAcceptanceStatusEnum::cases(), 'value'))],
                ];
                
            case IntentEnum::API_DETAIL_WORKER_PANEL_ACCEPT_WORK_WITH_IMAGE->value:
                return [
                    'intent' => ['nullable', 'in:' . implode(',', array_column(IntentEnum::cases(), 'value'))],
                    'image_path' => 'image|mimes:jpeg,png,jpg,gif,svg|max:2048',
                ];    
        }

        return [
            'image_path' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
            'serial_panel_id' => 'nullable|exists:serial_panels,id',
            'worker_id' => 'nullable|exists:users,id',
            'progress_step_id' => 'nullable|exists:progress_steps,id',
            'estimated_time' => 'nullable|integer',
            'work_status' => ['nullable', 'in:' . implode(',', array_column(DetailWorkerPanelWorkStatusEnum::cases(), 'value'))],
            'acceptance_status' => ['nullable', 'in:' . implode(',', array_column(DetailWorkerPanelAcceptanceStatusEnum::cases(), 'value'))],
            // Add your validation rules here
        ];
    }

    public function after() {
        return [
            function ($validator) {
                if ($this->get('acceptance_status') && !Auth::user()->hasRole([RoleEnum::SUPERVISOR_ASSEMBLY])) {
                    $validator->errors()->add(
                        'Detail Worker Panel Acceptance', 
                        __('validation.custom.detail_worker_trainset.update_worker.field_update_role_exception', ['role' => RoleEnum::SUPERVISOR_ASSEMBLY->value, 'field' => 'acceptance_status'])
                    );
                }
            }
        ];
    }
}