<?php

namespace App\Http\Requests\Workstation;

use Illuminate\Foundation\Http\FormRequest;

class StoreWorkstationRequest extends FormRequest {
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
            'workshop_id' => 'required|exists:workshops,id',
            'division_id' => 'required|exists:divisions,id',
            'name' => 'required|string|max:255',
            'location' => 'required|string|max:255',
        ];
    }
}