<?php

namespace App\Http\Requests\TrainsetAttachment;

use App\Support\Enums\IntentEnum;
use Illuminate\Foundation\Http\FormRequest;

class UpdateTrainsetAttachmentRequest extends FormRequest {
    public function rules(): array {
        $intent = $this->get('intent');

        switch ($intent) {
            case IntentEnum::API_TRAINSET_ATTACHMENT_ASSIGN_WORKER->value:
                return [
                    'worker_id' => [
                        'integer',
                        'exists:users,id',
                    ],
                    'carriage_panel_component_id' => [
                        'integer',
                        'exists:trainset_attachment_components,carriage_panel_component_id',
                    ],
                ];
        }
        return [
            // Add your validation rules here
        ];
    }
}
