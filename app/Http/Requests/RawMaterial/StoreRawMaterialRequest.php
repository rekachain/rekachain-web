<?php

namespace App\Http\Requests\RawMaterial;

use App\Support\Enums\IntentEnum;
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
        $intent = $this->get('intent');

        switch ($intent) {
            case IntentEnum::WEB_RAW_MATERIAL_IMPORT_RAW_MATERIAL->value:
                return [
                    'import_file' => 'required|file|mimes:xlsx,xls|max:2048',
                ];
        }

        return [
            'material_code' => 'required|string|max:255|unique:raw_materials',
            'description' => 'required|string|max:255',
            'specs' => 'required|string|max:255',
            'unit' => 'required|string|max:255',
        ];
    }
}
