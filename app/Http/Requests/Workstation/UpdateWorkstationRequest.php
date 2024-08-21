<?php

namespace App\Http\Requests\Workstation;

use Illuminate\Foundation\Http\FormRequest;

class UpdateWorkstationRequest extends FormRequest {
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
            'workshop_id' => 'nullable|exists:workshops,id',
            'division_id' => 'nullable|exists:divisions,id',
            'name' => 'nullable|string|max:255',
            'location' => 'nullable|string|max:255',
        ];
    }
}
