<?php

namespace App\Http\Requests\Step;

use App\Support\Enums\IntentEnum;
use Illuminate\Foundation\Http\FormRequest;

class StoreStepRequest extends FormRequest {
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
            case IntentEnum::WEB_STEP_IMPORT_STEP->value:
                return [
                    'import_file' => 'required|file|mimes:xlsx,xls|max:2048',
                ];
        }

        return [
            'progress_id' => 'required|integer|exists:progress,id',
            'name' => 'required|string|max:255',
            'process' => 'required|string|max:255',
            'estimated_time' => 'nullable|integer',
        ];
    }
}
