<?php

namespace App\Http\Requests\ProgressStep;

use Illuminate\Foundation\Http\FormRequest;

class UpdateProgressStepRequest extends FormRequest {
    public function rules(): array {
        return [
            'progress_id' => 'nullable|exists:progress,id',
            'step_id' => 'nullable|exists:steps,id',
        ];
    }
}
