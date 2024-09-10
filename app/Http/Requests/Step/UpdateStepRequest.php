<?php

namespace App\Http\Requests\Step;

use Illuminate\Foundation\Http\FormRequest;

class UpdateStepRequest extends FormRequest {
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
            'progress_id' => 'required|integer|exists:progress,id',
            'name' => 'required|string|max:255',
            'process' => 'required|string|max:255',
            'estimated_time' => 'nullable|integer',
        ];
    }
}
