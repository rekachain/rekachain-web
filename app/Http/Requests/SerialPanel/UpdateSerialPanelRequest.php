<?php

namespace App\Http\Requests\SerialPanel;

use App\Support\Enums\IntentEnum;
use Illuminate\Foundation\Http\FormRequest;

class UpdateSerialPanelRequest extends FormRequest {
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

        switch ($intent){
            case IntentEnum::API_SERIAL_PANEL_UPDATE_PANEL_MANUFACTURE_STATUS->value:
                return [
                    'notes' => 'required|string|max:255'
                ];
        }
        return [
            'panel_attachment_id' => 'nullable|string|max:255',
            'qr_code' => 'nullable|string|max:255',
            'qr_path'=> 'nullable|string|max:255',
            'manufacture_status' => 'nullable|string|max:255',
            'notes' => 'nullable|string|max:255',
        ];
    }
}