<?php

namespace App\Http\Requests\ComponentMaterial;

use Illuminate\Foundation\Http\FormRequest;

class UpdateComponentMaterialRequest extends FormRequest {
    public function rules(): array {
        return [
            'carriage_panel_component_id' => 'nullable|exists:carriage_panel_component,id',
            'raw_material_id' => 'nullable|exists:raw_materials,id',
            'qty' => 'nullable|integer',
            // Add your validation rules here
        ];
    }
}
