<?php

namespace App\Http\Requests\CarriagePanel;

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
        return [
            'progress_id' => 'nullable|integer|exists:progress,id',
            'carriage_trainset_id' => 'nullable|integer|exists:carriage_trainset,id',
            'panel_id' => 'nullable|integer|exists:panels,id',
            'qty' => 'nullable|integer',
        ];
    }
}
