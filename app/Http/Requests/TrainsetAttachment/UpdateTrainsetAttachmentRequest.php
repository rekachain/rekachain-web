<?php

namespace App\Http\Requests\TrainsetAttachment;

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
}
