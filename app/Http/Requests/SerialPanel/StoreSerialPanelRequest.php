<?php

namespace App\Http\Requests\SerialPanel;

use Illuminate\Foundation\Http\FormRequest;

class StoreSerialPanelRequest extends FormRequest {
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
        return [
            'panel_attachment_id' => 'require|string|max:255',
            'qr_code' => 'require|string|max:255',
            'qr_path'=> 'require|string|max:255',
            'manufacture_status' => 'require|string|max:255',
            'notes' => 'require|string|max:255',
        ];
    }
}