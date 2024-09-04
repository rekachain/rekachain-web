<?php

namespace App\Http\Requests\RawMaterial;

use Illuminate\Foundation\Http\FormRequest;

class UpdateRawMaterialRequest extends FormRequest {
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

        $materialId = $this->route('raw_material')->id;

        return [
            'material_code' => 'required|string|max:255|unique:raw_materials,material_code,' . $materialId,
            'description' => 'required|string|max:255',
            'specs' => 'required|string|max:255',
            'unit' => 'required|string|max:255',
        ];
    }
}
