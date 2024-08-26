<?php

namespace App\Http\Requests\Carriage;

use App\Rules\Carriage\CarriagePanelUniquePanel;
use App\Support\Enums\IntentEnum;
use Illuminate\Foundation\Http\FormRequest;

class UpdateCarriageRequest extends FormRequest {
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
            case IntentEnum::WEB_CARRIAGE_ADD_CARRIAGE_PANEL->value:
                return [
                    'panel_id' => [
                        'nullable',
                        'integer',
                        'exists:panels,id',
                        new CarriagePanelUniquePanel,
                    ],
                    'carriage_panel_progress_id' => 'required|integer|exists:progress,id',
                    'panel_name' => 'nullable|string|max:255',
                    'panel_description' => 'nullable|string|max:255',
                    'carriage_panel_qty' => 'required|integer|min:1',
                ];
        }

        return [
            'type' => 'nullable|string|max:255',
            'description' => 'nullable|string|max:255',
        ];
    }
}
