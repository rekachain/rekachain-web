<?php

namespace App\Http\Requests\TrainsetAttachment;

use Illuminate\Foundation\Http\FormRequest;
use App\Support\Enums\TrainsetAttachmentStatusEnum;
use App\Rules\TrainsetAttachment\TrainsetAttachmentAssignWorkerValidation;
use Illuminate\Support\Facades\Auth;

class UpdateTrainsetAttachmentRequest extends FormRequest {
    public function rules(): array {
        $intent = $this->get('intent');

        switch ($intent) {
            case IntentEnum::API_TRAINSET_ATTACHMENT_UPDATE_ASSIGN_SPV_AND_RECEIVER->value:
                $arr = [
                    'supervisor_id' => [
                        'nullable',
                        'integer',
                        'exists:users,id',
                        function ($attribute, $value, $fail) {
                            if (!User::find($value)->hasRole(RoleEnum::SUPERVISOR_MEKANIK) || !User::find($value)->hasRole(RoleEnum::SUPERVISOR_ELEKTRIK)) {
                                $fail(__('exception.auth.role.role_exception', ['role' => RoleEnum::SUPERVISOR_MEKANIK->value . ' / ' . RoleEnum::SUPERVISOR_ELEKTRIK->value]));
                            }
                        },
                    ],
                ];
                if ($this->get('receiver_name')) {
                    $arr['receiver_name'] = 'required|string|max:255';
                } else {
                    $arr['receiver_id'] = 'required|integer|exists:users,id';
                }
                return $arr;
            case IntentEnum::API_TRAINSET_ATTACHMENT_ASSIGN_WORKER->value:
                $arr = [
                    'carriage_panel_component_id' => [
                        'required',
                        'integer',
                        'exists:trainset_attachment_components,carriage_panel_component_id,trainset_attachment_id,' . $this->route('trainset_attachment')->id,
                    ],
                ];
                if ($this->get('worker_id')) {
                    if (!Auth::user()->hasRole([RoleEnum::SUPERVISOR_MEKANIK, RoleEnum::SUPERVISOR_ELEKTRIK])) {
                        abort(403, __('exception.auth.role.role_exception', ['role' => RoleEnum::SUPERVISOR_MEKANIK->value . ' / ' . RoleEnum::SUPERVISOR_ELEKTRIK->value]));
                    }
                    $arr['worker_id'] = 'required|integer|exists:users,id';
                }
                return $arr;
            case IntentEnum::API_TRAINSET_ATTACHMENT_CONFIRM_KPM_BY_SPV->value:
                return [
                    'status' => ['required', 'in:' . implode(',', array_column(TrainsetAttachmentStatusEnum::cases(), 'value'))],
                    'note' => ['nullable', 'string', 'max:255'] 
                ];
        }
        return [
            // Add your validation rules here
        ];
    }
}
