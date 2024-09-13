<?php

namespace App\Http\Requests\Trainset;

use App\Support\Enums\IntentEnum;
use Illuminate\Foundation\Http\FormRequest;

class StoreTrainsetRequest extends FormRequest {
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
            case IntentEnum::WEB_TRAINSET_IMPORT_TRAINSET->value:
                return [
                    'import_file' => 'required|file|mimes:xlsx,xls|max:2048',
                ];
        }

        return [
            'project_id' => 'required|integer',
            'name' => 'required|string|max:255',
        ];
    }
}
