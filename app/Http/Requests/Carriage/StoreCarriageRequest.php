<?php

namespace App\Http\Requests\Carriage;

use App\Support\Enums\IntentEnum;
use Illuminate\Foundation\Http\FormRequest;

class StoreCarriageRequest extends FormRequest {
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
            case IntentEnum::WEB_CARRIAGE_IMPORT_CARRIAGE->value:
                return [
                    'import_file' => 'required|file|mimes:xlsx,xls|max:2048',
                ];
        }
        
        return [
            'type' => 'required|string|max:255',
            'description' => 'required|string|max:255',
        ];
    }
}