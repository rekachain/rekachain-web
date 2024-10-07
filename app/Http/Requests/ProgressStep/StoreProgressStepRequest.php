<?php

namespace App\Http\Requests\ProgressStep;

use Illuminate\Foundation\Http\FormRequest;

class StoreProgressStepRequest extends FormRequest {
    public function rules(): array {
        return [
            'progress_id' => 'required|exists:progress,id',
            'step_id' => 'required|exists:steps,id',
        ];
    }
}
