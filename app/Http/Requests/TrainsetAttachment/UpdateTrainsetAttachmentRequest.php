<?php

namespace App\Http\Requests\TrainsetAttachment;

use App\Models\User;
use App\Support\Enums\IntentEnum;
use App\Support\Enums\RoleEnum;
use Illuminate\Foundation\Http\FormRequest;
use App\Support\Enums\TrainsetAttachmentStatusEnum;
use App\Rules\TrainsetAttachment\TrainsetAttachmentAssignWorkerStepValidation;

class UpdateTrainsetAttachmentRequest extends FormRequest {
    public function authorize(): bool {
        return true;
    }
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
                                $fail(__('validation.custom.auth.role_exception', ['role' => RoleEnum::SUPERVISOR_MEKANIK->value . ' / ' . RoleEnum::SUPERVISOR_ELEKTRIK->value]));
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
                    $arr['worker_id'] = 'required|integer|exists:users,id';
                }
                return $arr;
            case IntentEnum::API_TRAINSET_ATTACHMENT_CONFIRM_KPM_BY_SPV->value:
                return [
                    'status' => ['required', 'in:' . implode(',', array_column(TrainsetAttachmentStatusEnum::cases(), 'value'))],
                ];    
        }
        return [
            // Add your validation rules here
        ];
    }

    public function after() {
        $trainsetAttachment = $this->route('trainset_attachment');
        $intent = $this->get('intent');

        switch ($intent) {
            case IntentEnum::API_TRAINSET_ATTACHMENT_ASSIGN_WORKER->value:
                return [
                    function ($validator) use ($trainsetAttachment) {
                        $validator->safe()->all();
                        $userId = $validator->getData()['worker_id'] ?? auth()->user()->id;
                        $assignWorkerStepValidation = new TrainsetAttachmentAssignWorkerStepValidation();
                        $assignWorkerStepValidation->validate('Trainset Attachment', [
                            $trainsetAttachment,
                            $validator->getData()['carriage_panel_component_id'],
                            User::find($userId),
                        ], function ($message) use ($validator) {
                            $validator->errors()->add('Trainset Attachment Worker Assign', $message);
                        });
                    }
                ];
            default:
                return [];
        }
    }
}