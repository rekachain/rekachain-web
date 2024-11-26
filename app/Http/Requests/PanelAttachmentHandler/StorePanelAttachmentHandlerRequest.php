<?php

namespace App\Http\Requests\PanelAttachmentHandler;

use App\Support\Enums\PanelAttachmentHandlerHandlesEnum;
use Illuminate\Foundation\Http\FormRequest;

class StorePanelAttachmentHandlerRequest extends FormRequest {
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
            'user_id' => 'required|integer|exists:users,id',
            'handler_name' => 'required|string|max:255',
            'panel_attachment_id' => 'required|integer|exists:panel_attachment,id',
            'handles' => 'required|in:' . implode(',', PanelAttachmentHandlerHandlesEnum::toArray()),
        ];
    }
}
