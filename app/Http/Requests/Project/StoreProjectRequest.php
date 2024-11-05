<?php

namespace App\Http\Requests\Project;

use App\Support\Enums\IntentEnum;
use Illuminate\Foundation\Http\FormRequest;

class StoreProjectRequest extends FormRequest {
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
            case IntentEnum::WEB_PROJECT_IMPORT_PROJECT_TEMPLATE->value:
                return [
                    'file' => 'required|file|mimes:xlsx,xlsm',
                ];
            default:
                return [
                    'name' => 'required',
                    'trainset_needed' => 'required|numeric|min:0',
                    'initial_date' => 'required|date',
                ];
        }
    }
}
