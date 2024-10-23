<?php

namespace App\Http\Requests\CarriageTrainset;

use App\Rules\CarriageTrainset\CarriageTrainsetUniquePanel;
use App\Support\Enums\IntentEnum;
use Illuminate\Foundation\Http\FormRequest;

class UpdateCarriageTrainsetRequest extends FormRequest {
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
            case IntentEnum::WEB_CARRIAGE_TRAINSET_ADD_CARRIAGE_PANEL->value:
                return [
                    'panel_id' => [
                        'nullable',
                        'integer',
                        'exists:panels,id',
                        new CarriageTrainsetUniquePanel,
                    ],
                    'carriage_panel_progress_id' => 'required|integer|exists:progress,id',
                    'panel_name' => 'nullable|string|max:255',
                    'panel_description' => 'nullable|string|max:255',
                    'carriage_panel_qty' => 'required|integer|min:1',
                ];
        }

        return [
            'trainset_id' => 'nullable|integer|exists:trainsets,id',
            'carriage_id' => 'nullable|integer|exists:carriages,id',
            'qty' => 'nullable|integer',
        ];
    }
}
