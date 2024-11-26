<?php

namespace App\Http\Requests\TrainsetAttachment;

use App\Models\User;
use App\Rules\TrainsetAttachment\TrainsetAttachmentAssignWorkerValidation;
use App\Support\Enums\IntentEnum;
use App\Support\Enums\RoleEnum;
use App\Support\Enums\TrainsetAttachmentHandlerHandlesEnum;
use App\Support\Enums\TrainsetAttachmentStatusEnum;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class UpdateTrainsetAttachmentRequest extends FormRequest {
    public function authorize(): bool {
        return true;
    }

    public function rules(): array {
        $intent = $this->get('intent');

        switch ($intent) {
            case IntentEnum::WEB_TRAINSET_ATTACHMENT_ASSIGN_REFERENCED_ATTACHMENT->value:
                return [
                    'source_workstation_id' => [
                        'required_if:destination_workstation_id,' . $this->get('destination_workstation_id'),
                        'integer',
                        'exists:workstations,id',
                        function ($attribute, $value, $fail) {
                            if ($value === $this->get('destination_workstation_id')) {
                                $fail('The ' . $attribute . ' cannot be the same as the destination workstation ID.');
                            }
                        },
                    ],
                    'destination_workstation_id' => [
                        'required_if:source_workstation_id,' . $this->get('source_workstation_id'),
                        'integer',
                        'exists:workstations,id',
                        function ($attribute, $value, $fail) {
                            if ($value === $this->get('source_workstation_id')) {
                                $fail('The ' . $attribute . ' cannot be the same as the source workstation ID.');
                            }
                        },
                    ],
                ];
            case IntentEnum::WEB_TRAINSET_ATTACHMENT_ASSIGN_REFERENCED_ATTACHMENT_AND_MATERIAL_IMPORT->value:
                return [
                    'file' => 'required|file|mimes:xlsx,xlsm',
                    'to_be_assigned' => 'nullable|boolean',
                    // 'override' => 'required_if:to_be_assigned,false|boolean',
                    'override' => 'nullable|boolean',
                    'source_workstation_id' => [
                        'required_if:destination_workstation_id,' . $this->get('destination_workstation_id'),
                        'integer',
                        'exists:workstations,id',
                        function ($attribute, $value, $fail) {
                            if ($value === $this->get('destination_workstation_id')) {
                                $fail('The ' . $attribute . ' cannot be the same as the destination workstation ID.');
                            }
                        },
                    ],
                    'destination_workstation_id' => [
                        'required_if:source_workstation_id,' . $this->get('source_workstation_id'),
                        'integer',
                        'exists:workstations,id',
                        function ($attribute, $value, $fail) {
                            if ($value === $this->get('source_workstation_id')) {
                                $fail('The ' . $attribute . ' cannot be the same as the source workstation ID.');
                            }
                        },
                    ],
                ];
            case IntentEnum::WEB_TRAINSET_ATTACHMENT_ASSIGN_CUSTOM_ATTACHMENT_MATERIAL->value:
                return [
                    'override' => 'nullable|boolean',
                    'raw_material_id' => 'required|integer|exists:raw_materials,id',
                    'qty' => 'required|integer',
                ];
            case IntentEnum::API_TRAINSET_ATTACHMENT_UPDATE_ATTACHMENT_STATUS->value:
                return [
                    'status' => ['required', 'in:' . implode(',', array_column(TrainsetAttachmentStatusEnum::cases(), 'value'))],
                    'note' => [
                        'required_if:status,' . TrainsetAttachmentStatusEnum::PENDING->value,
                    ],
                ];
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
            case IntentEnum::API_TRAINSET_ATTACHMENT_ASSIGN_WORKER_COMPONENT->value:
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
                    'note' => ['nullable', 'string', 'max:255'],
                ];
            case IntentEnum::API_TRAINSET_ATTACHMENT_ASSIGN_HANDLER->value:
                return [
                    'handles' => ['required', 'in:' . implode(',', array_column(TrainsetAttachmentHandlerHandlesEnum::cases(), 'value'))],
                ];
        }

        return [
            'trainset_id' => 'nullable|integer|exists:trainsets,id',
            'source_workstation_id' => 'nullable|integer|exists:workstations,id',
            'destination_workstation_id' => 'nullable|integer|exists:workstations,id',
            'attachment_number' => 'nullable|string',
            'qr_code' => 'nullable|string',
            'qr_path' => 'nullable|string',
            'elapsed_time' => 'nullable|string',
            'status' => 'nullable|in:' . implode(',', TrainsetAttachmentStatusEnum::toArray()),
            'note' => [
                'required_if:status,' . TrainsetAttachmentStatusEnum::PENDING->value,
            ],
            'supervisor_id' => 'nullable|integer|exists:users,id',
            'trainset_attachment_id' => 'nullable|integer|exists:trainset_attachments,id',
        ];
    }

    public function after() {
        $trainsetAttachment = $this->route('trainset_attachment');
        $intent = $this->get('intent');

        switch ($intent) {
            case IntentEnum::API_TRAINSET_ATTACHMENT_ASSIGN_WORKER_COMPONENT->value:
                return [
                    function ($validator) use ($trainsetAttachment) {
                        $validator->safe()->all();
                        $userId = $validator->getData()['worker_id'] ?? auth()->user()->id;
                        $assignWorkerStepValidation = new TrainsetAttachmentAssignWorkerValidation;
                        $assignWorkerStepValidation->validate('Trainset Attachment', [
                            $trainsetAttachment,
                            $validator->getData()['carriage_panel_component_id'],
                            User::find($userId),
                        ], function ($message) use ($validator) {
                            $validator->errors()->add('Trainset Attachment Worker Assign', $message);
                        });
                    },
                ];
            default:
                return [];
        }
    }
}
