<?php

namespace App\Http\Requests\Trainset;

use App\Rules\UniquePresetNameInProjectValidation;
use App\Support\Enums\IntentEnum;
use Illuminate\Foundation\Http\FormRequest;

class UpdateTrainsetRequest extends FormRequest {
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
            case IntentEnum::WEB_PROJECT_CHANGE_TRAINSET_PRESET->value:
                return [
                    'preset_trainset_id' => 'required|integer|exists:preset_trainsets,id',
                ];

            case IntentEnum::WEB_PROJECT_SAVE_TRAINSET_PRESET->value:
                return [
                    'preset_name' => [
                        'required',
                        'string',
                        'max:255',
                        new UniquePresetNameInProjectValidation,
                    ],
                    'project_id' => 'required|integer|exists:projects,id',
                ];

            case IntentEnum::WEB_TRAINSET_DELETE_CARRIAGE_TRAINSET->value:
                return [
                    'carriage_trainset_id' => 'required|numeric|exists:carriage_trainset,id',
                ];
        }

        $trainset = $this->route('trainset')->id;

        return [
            'project_id' => 'required|integer',
            'name' => 'required|string|max:255',
        ];
    }
}
