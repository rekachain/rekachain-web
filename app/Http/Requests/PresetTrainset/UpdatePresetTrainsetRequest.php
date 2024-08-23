<?php

namespace App\Http\Requests\PresetTrainset;

use Illuminate\Foundation\Http\FormRequest;

class UpdatePresetTrainsetRequest extends FormRequest {
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
            'name' => 'nullable|string|max:255',
            'project_id' => 'nullable|integer|exists:projects,id',
        ];
    }
}
