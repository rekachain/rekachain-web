<?php

namespace App\Http\Requests\CarriagePreset;

use Illuminate\Foundation\Http\FormRequest;

class StoreCarriagePresetRequest extends FormRequest {
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
            'preset_trainset_id' => ['required', 'integer', 'exists:preset_trainsets,id'],
            'carriage_id' => ['required', 'integer', 'exists:carriages,id'],
            'qty' => ['required', 'integer', 'min:1'],
        ];
    }
}
