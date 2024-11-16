<?php

namespace App\Http\Requests\CarriagePanelComponent;

use App\Support\Enums\IntentEnum;
use Illuminate\Foundation\Http\FormRequest;

class UpdateCarriagePanelComponentRequest extends FormRequest {
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
            case IntentEnum::WEB_CARRIAGE_PANEL_COMPONENT_IMPORT_PROGRESS_AND_MATERIAL->value:
                return [
                    'file' => 'required|file|mimes:xlsx,xlsm',
                    'work_aspect_id' => 'required|integer|exists:work_aspects,id',
                ];
            case IntentEnum::WEB_CARRIAGE_PANEL_COMPONENT_ADD_RAW_MATERIAL->value:
                return [
                    'raw_material_id' => 'nullable|integer|exists:raw_materials,id',
                    'new_raw_material_code' => 'nullable|string',
                    'new_raw_material_description' => 'nullable|string',
                    'new_raw_material_unit' => 'nullable|string',
                    'new_raw_material_specs' => 'nullable|string',
                    'new_raw_material_qty' => 'nullable|integer|min:0',
                ];
            case IntentEnum::WEB_CARRIAGE_PANEL_COMPONENT_CHANGE_PROGRESS->value:
                return [
                    'progress_id' => 'nullable|integer|exists:progress,id',
                    'progress_name' => 'required_with:progress_work_aspect_id|string',
                    'progress_work_aspect_id' => 'required_with:progress_name|integer|exists:work_aspects,id',
                ];
            default:
                return [
                    'carriage_panel_id' => 'nullable|integer|exists:carriage_panels,id',
                    'component_id' => 'nullable|integer|exists:components,id',
                    'progress_id' => 'nullable|integer|exists:progress,id',
                    'qty' => 'nullable|integer|min:0',
                ];
        }
    }
}
