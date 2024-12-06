<?php

namespace App\Http\Requests\DetailWorkerTrainset;

use App\Support\Enums\DetailWorkerTrainsetAcceptanceStatusEnum;
use App\Support\Enums\DetailWorkerTrainsetWorkStatusEnum;
use App\Support\Enums\IntentEnum;
use App\Support\Enums\RoleEnum;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class UpdateDetailWorkerTrainsetRequest extends FormRequest {
    public function rules(): array {
        $intent = $this->get('intent');
        switch ($intent) {
            case IntentEnum::API_DETAIL_WORKER_TRAINSET_REJECT_WORK->value:
                return [
                    'notes' => ['required', 'string'],
                    'total_failed' => 'required|integer|min:1|max:' . $this->route('detail_worker_trainset')->trainset_attachment_component->total_current_work_progress,
                ];
            case IntentEnum::API_DETAIL_WORKER_TRAINSET_ACCEPT_WORK_WITH_IMAGE->value:
                return [
                    'image_path' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
                ];
        }

        return [
            'image_path' => [
                'required_if:work_status,' . DetailWorkerTrainsetWorkStatusEnum::COMPLETED->value,
                'image', 'mimes:jpeg,png,jpg', 'max:2048',
            ],
            'trainset_attachment_id' => 'nullable|exists:trainset_attachments,id',
            'worker_id' => 'nullable|exists:users,id',
            'progress_step_id' => 'nullable|exists:progress_steps,id',
            'estimated_time' => 'nullable|integer',
            'work_status' => [
                'required_with:image_path,failed_note',
                'in:' . implode(',', DetailWorkerTrainsetWorkStatusEnum::toArray()),
            ],
            'acceptance_status' => ['nullable', 'in:' . implode(',', DetailWorkerTrainsetAcceptanceStatusEnum::toArray())],
            'failed_note' => 'nullable|string',
            'total_failed' => [
                'required_with:failed_note',
                'integer',
                'min:1',
                'max:' . $this->route('detail_worker_trainset')->trainset_attachment_component->total_current_work_progress,
            ],
        ];
    }

    public function after() {
        return [
            function ($validator) {
                if ($this->get('acceptance_status') && !Auth::user()->hasRole([RoleEnum::SUPERVISOR_MEKANIK, RoleEnum::SUPERVISOR_ELEKTRIK])) {
                    $validator->errors()->add(
                        'Detail Worker Trainset Acceptance',
                        __('validation.custom.detail_worker_trainset.update_worker.field_update_role_exception', ['role' => RoleEnum::SUPERVISOR_MEKANIK->value . ' / ' . RoleEnum::SUPERVISOR_ELEKTRIK->value, 'field' => 'acceptance_status'])
                    );
                }
            },
        ];
    }
}
