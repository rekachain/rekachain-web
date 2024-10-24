<?php

namespace App\Http\Requests\PanelAttachmentHandler;

use Illuminate\Foundation\Http\FormRequest;
use App\Support\Enums\PanelAttachmentHandlerHandlesEnum;

class UpdatePanelAttachmentHandlerRequest extends FormRequest {
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
        return [
            'user_id' => 'nullable|integer|exists:users,id',
            'handler_name' => 'nullable|string|max:255',
            'panel_attachment_id' => 'nullable|integer|exists:panel_attachment,id',
            'handles' => 'nullable|in:' . implode(',', PanelAttachmentHandlerHandlesEnum::toArray()),
        ];
    }
}