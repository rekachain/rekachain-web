<?php

namespace App\Http\Requests\WorkDayTime;

use Illuminate\Foundation\Http\FormRequest;

class StoreWorkDayTimeRequest extends FormRequest {
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
            'work_day_id' => 'required|integer|exists:work_days,id',
            'start_time' => 'required|date_format:H:i',
            'end_time' => 'required|date_format:H:i|after:start_time',
            'status' => 'required|string|in:' . implode(',', WorkDayTime::STATUS_TYPES),
        ];
    }
}
