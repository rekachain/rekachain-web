<?php

namespace App\Http\Requests\PanelMaterial;

use Illuminate\Foundation\Http\FormRequest;

class StorePanelMaterialRequest extends FormRequest {
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
            'carriage_panel_id' => 'integer',
            'raw_material_id' => 'integer',
            'qty' => 'integer',
        ];
    }
}
