<?php

namespace App\Http\Requests\Project\Trainset;

use App\Support\Enums\IntentEnum;
use Illuminate\Foundation\Http\FormRequest;

class TrainsetProjectRequest extends FormRequest {
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
            case IntentEnum::WEB_PROJECT_IMPORT_TRAINSET_PANEL_PROGRESS_AND_MATERIAL->value:
                return [
                    'file' => 'required|file|mimes:xlsx,xlsm',
                    'panel_id' => 'required|exists:panels,id',
                    'override' => 'nullable|boolean',
                ];
            case IntentEnum::WEB_PROJECT_IMPORT_TRAINSET_COMPONENT_PROGRESS_AND_MATERIAL->value:
                return [
                    'file' => 'required|file|mimes:xlsx,xlsm',
                    'component_id' => 'required|exists:components,id',
                    'work_aspect_id' => 'required|exists:work_aspects,id',
                    'override' => 'nullable|boolean',
                ];
            default:
                return [];
        }
    }
}
