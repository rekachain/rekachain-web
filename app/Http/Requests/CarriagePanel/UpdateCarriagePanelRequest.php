<?php

namespace App\Http\Requests\CarriagePanel;

use App\Rules\CarriagePanel\CarriagePanelUniqueComponent;
use App\Support\Enums\IntentEnum;
use Illuminate\Foundation\Http\FormRequest;

class UpdateCarriagePanelRequest extends FormRequest {
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
            case IntentEnum::WEB_CARRIAGE_PANEL_IMPORT_PROGRESS_AND_MATERIAL:
                return [
                    'file' => 'required|mimes:xlsx,xlsm',
                ];
            case IntentEnum::WEB_CARRIAGE_PANEL_ADD_COMPONENT->value:
                return [
                    'component_id' => [
                        'nullable',
                        'integer',
                        'exists:components,id',
                        new CarriagePanelUniqueComponent,
                    ],
                    'component_progress_id' => 'required|integer|exists:progress,id',
                    'component_name' => 'nullable|string|max:255',
                    'component_description' => 'nullable|string|max:255',
                    'carriage_component_qty' => 'required|integer|min:1',
                ];
            case IntentEnum::WEB_CARRIAGE_PANEL_ADD_RAW_MATERIAL->value:
                return [
                    'raw_material_id' => 'nullable|integer|exists:raw_materials,id',
                    'new_raw_material_code' => 'nullable|string',
                    'new_raw_material_description' => 'nullable|string',
                    'new_raw_material_unit' => 'nullable|string',
                    'new_raw_material_specs' => 'nullable|string',
                    'new_raw_material_qty' => 'nullable|integer|min:0',
                ];
            case IntentEnum::WEB_CARRIAGE_PANEL_CHANGE_PROGRESS->value:
                return [
                    'progress_id' => 'nullable|integer|exists:progress,id',
                    'progress_name' => 'nullable|string',
                    'progress_work_aspect_id' => 'nullable|integer|exists:work_aspects,id',

                    // TODO: Intended validation rules for progress_name and progress_work_aspect_id
                    //                    'progress_name' => 'required_with:progress_work_aspect_id|string',
                    //                    'progress_work_aspect_id' => 'required_with:progress_name|integer|exists:work_aspects,id',
                ];
            default:
                return [
                    'progress_id' => 'nullable|integer|exists:progress,id',
                    'carriage_trainset_id' => 'nullable|integer|exists:carriage_trainset,id',
                    'panel_id' => 'nullable|integer|exists:panels,id',
                    'qty' => 'nullable|integer',
                ];
        }
    }
}
