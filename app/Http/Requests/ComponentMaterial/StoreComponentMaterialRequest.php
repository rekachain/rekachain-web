<?php

namespace App\Http\Requests\ComponentMaterial;

use Illuminate\Foundation\Http\FormRequest;

class StoreComponentMaterialRequest extends FormRequest {
    public function rules(): array {
        return [
            'carriage_panel_component_id' => 'required|exists:carriage_panel_component,id',
            'raw_material_id' => 'required|exists:raw_materials,id',
            'qty' => 'required|integer',
            // Add your validation rules here
        ];
    }
}
