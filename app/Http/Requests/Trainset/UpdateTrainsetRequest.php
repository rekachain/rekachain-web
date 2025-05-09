<?php

namespace App\Http\Requests\Trainset;

use App\Rules\UniquePresetNameInProjectValidation;
use App\Support\Enums\IntentEnum;
use App\Support\Enums\TrainsetAttachmentTypeEnum;
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

            case IntentEnum::WEB_TRAINSET_ADD_CARRIAGE_TRAINSET->value:
                return [
                    'carriage_id' => 'nullable|numeric|exists:carriages,id',
                    'carriage_type' => 'nullable|string|max:255',
                    'carriage_description' => 'nullable|string|max:255',
                    'carriage_qty' => 'required|integer|min:1',
                ];

            case IntentEnum::WEB_TRAINSET_UPDATE_CARRIAGE_TRAINSET->value:
                return [
                    'carriage_trainset_id' => 'required|numeric|exists:carriage_trainset,id',
                    'qty' => 'nullable|integer|min:1',
                    'carriage_id' => 'nullable|integer|exists:carriages,id',
                ];

            case IntentEnum::WEB_TRAINSET_GENERATE_PANEL_ATTACHMENTS->value:
                return [
                    'assembly_source_workstation_id' => 'required|integer|exists:workstations,id',
                    'assembly_destination_workstation_id' => 'required|integer|different:assembly_source_workstation_id|exists:workstations,id',
                ];
            case IntentEnum::WEB_TRAINSET_GENERATE_TRAINSET_ATTACHMENTS->value:
                return [
                    'division' => 'required|in:' . implode(',', TrainsetAttachmentTypeEnum::toArray()),
                    'mechanic_source_workstation_id' => 'required_if:division,mechanic|integer|exists:workstations,id',
                    'mechanic_destination_workstation_id' => 'required_if:division,mechanic|integer|different:mechanic_source_workstation_id|exists:workstations,id',
                    'electric_source_workstation_id' => 'required_if:division,electric|integer|exists:workstations,id',
                    'electric_destination_workstation_id' => 'required_if:division,electric|integer|different:electric_source_workstation_id|exists:workstations,id',
                ];
        }

        $trainset = $this->route('trainset')->id;

        return [
            'project_id' => 'nullable|integer',
            'name' => 'nullable|string|max:255',
        ];
    }
}
