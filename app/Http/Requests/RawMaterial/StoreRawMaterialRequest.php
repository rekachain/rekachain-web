<?php

namespace App\Http\Requests\RawMaterial;

use Illuminate\Foundation\Http\FormRequest;

class StoreRawMaterialRequest extends FormRequest {
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
            'material_code' => 'required|string|max:255|unique:raw_materials',
            'description' => 'required|string|max:255',
            'specs' => 'required|string|max:255',
            'unit' => 'required|string|max:255',
        ];
    }
}
