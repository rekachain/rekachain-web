<?php

namespace App\Http\Requests\DetailWorkerTrainset;

use App\Support\Enums\IntentEnum;
use App\Support\Enums\RoleEnum;
use Illuminate\Foundation\Http\FormRequest;
use App\Support\Enums\DetailWorkerTrainsetWorkStatusEnum;
use App\Support\Enums\DetailWorkerTrainsetAcceptanceStatusEnum;

class UpdateDetailWorkerTrainsetRequest extends FormRequest {
    public function rules(): array {
        $intent = $this->get('intent');
        switch ($intent){
            case IntentEnum::API_DETAIL_WORKER_TRAINSET_ACCEPT_WORK_WITH_IMAGE->value:
                return [
                    'intent' => ['nullable', 'in:' . implode(',', array_column(IntentEnum::cases(), 'value'))],
                    'image_path' => 'image|mimes:jpeg,png,jpg,gif,svg|max:2048',
                ]; 
        }
        
        return [
            'image_path' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
            'trainset_attachment_id' => 'nullable|exists:trainset_attachments,id',
            'worker_id' => 'nullable|exists:users,id',
            'progress_step_id' => 'nullable|exists:progress_steps,id',
            'estimated_time' => 'nullable|integer',
            'work_status' => ['nullable', 'in:' . implode(',', array_column(DetailWorkerTrainsetWorkStatusEnum::cases(), 'value'))],
            'acceptance_status' => ['nullable', 'in:' . implode(',', array_column(DetailWorkerTrainsetAcceptanceStatusEnum::cases(), 'value'))],
        ];
    }

    public function after() {
        return [
            function ($validator) {
                if ($this->get('acceptance_status') && !auth()->user()->hasRole(RoleEnum::SUPERVISOR_ASSEMBLY)) {
                    $validator->errors()->add(
                        'Detail Worker Trainset Acceptance', 
                        __('validation.custom.detail_worker_trainset.update_worker.field_update_role_exception', ['role' => RoleEnum::SUPERVISOR_ASSEMBLY->value, 'field' => 'acceptance_status'])
                    );
                }
            }
        ];
    }
}