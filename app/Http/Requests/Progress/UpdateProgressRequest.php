<?php

namespace App\Http\Requests\Progress;

use App\Support\Enums\IntentEnum;
use Illuminate\Foundation\Http\FormRequest;

class UpdateProgressRequest extends FormRequest {
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

        $progress = $this->route('progress')->id;

        $intent = $this->get('intent');

        switch ($intent) {
            case IntentEnum::WEB_PROGRESS_CREATE_STEP->value:
                return [
                    'step_id' => 'nullable|integer|exists:steps,id',
                    'step_name' => 'nullable|string|max:255|unique:steps,name',
                    'step_process' => 'nullable|string|max:255',
                    'step_estimated_time' => 'nullable|integer|min:0',
                ];
        }

        return [
            'name' => 'string|max:255',
            'work_aspect_id' => 'integer|exists:work_aspects,id',
        ];
    }
}
