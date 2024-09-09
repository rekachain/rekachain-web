<?php

namespace App\Http\Requests\Panel;

use App\Support\Enums\IntentEnum;
use Illuminate\Foundation\Http\FormRequest;

class StorePanelRequest extends FormRequest {
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
            case IntentEnum::WEB_PANEL_IMPORT_PANEL->value:
                return [
                    'import_file' => 'required|file|mimes:xlsx,xls|max:2048',
                ];
        }

        return [
            'name' => 'string|max:255',
            'description' => 'string|max:255',
            'progress_id' => 'nullable|integer|exists:progress,id',
        ];
    }
}
