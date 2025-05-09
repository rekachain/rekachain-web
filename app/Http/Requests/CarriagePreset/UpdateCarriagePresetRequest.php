<?php

namespace App\Http\Requests\CarriagePreset;

use Illuminate\Foundation\Http\FormRequest;

class UpdateCarriagePresetRequest extends FormRequest {
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
            'preset_trainset_id' => ['nullable', 'integer', 'exists:trainsets,id'],
            'carriage_id' => ['nullable', 'integer', 'exists:carriages,id'],
            'qty' => ['nullable', 'integer', 'min:1'],
        ];
    }
}
