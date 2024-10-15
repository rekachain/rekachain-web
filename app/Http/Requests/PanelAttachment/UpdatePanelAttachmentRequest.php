<?php

namespace App\Http\Requests\PanelAttachment;

use App\Support\Enums\IntentEnum;
use Illuminate\Foundation\Http\FormRequest;
use App\Support\Enums\PanelAttachmentStatusEnum;

class UpdatePanelAttachmentRequest extends FormRequest {
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

        switch ($intent) {
            case IntentEnum::API_PANEL_ATTACHMENT_CONFIRM_KPM_BY_SPV->value:
                return [
                    'intent' => ['nullable', 'in:' . implode(',', array_column(IntentEnum::cases(), 'value'))],
                    'status' => ['nullable', 'in:' . implode(',', array_column(PanelAttachmentStatusEnum::cases(), 'value'))],
                ];  
        }
        return [
            //
        ];
    }
}