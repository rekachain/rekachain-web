<?php

namespace App\Http\Requests\TrainsetAttachment;

use App\Models\TrainsetAttachmentComponent;
use App\Models\User;
use App\Rules\TrainsetAttachment\TrainsetAttachmentAssignWorkerStepValidation;
use App\Support\Enums\IntentEnum;
use Illuminate\Foundation\Http\FormRequest;

class UpdateTrainsetAttachmentRequest extends FormRequest {
    public function authorize(): bool {
        return true;
    }
    public function rules(): array {
        $intent = $this->get('intent');

        switch ($intent) {
            case IntentEnum::API_TRAINSET_ATTACHMENT_ASSIGN_WORKER->value:
                $arr = [
                    'carriage_panel_component_id' => [
                        'required',
                        'integer',
                        'exists:trainset_attachment_components,carriage_panel_component_id,trainset_attachment_id,' . $this->route('trainset_attachment')->id,
                    ],
                ];
                if ($this->get('worker_id')) {
                    $arr = array_merge($arr, [
                        'worker_id' => [
                            'integer',
                            'exists:users,id',
                        ]
                    ]);
                }
                return $arr;
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
