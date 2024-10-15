<?php

namespace App\Http\Requests\Progress;

use App\Support\Enums\IntentEnum;
use Illuminate\Foundation\Http\FormRequest;

class StoreProgressRequest extends FormRequest {
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
            case IntentEnum::WEB_PROGRESS_IMPORT_PROGRESS->value:
                return [
                    'import_file' => 'required|file|mimes:xlsx,xls|max:2048',
                ];
        }

        return [
            'name' => 'string|max:255',
            'work_aspect_id' => 'integer|exists:work_aspects,id',
        ];
    }
}
