<?php

namespace App\Http\Requests\CarriageTrainset;

use Illuminate\Foundation\Http\FormRequest;

class StoreCarriageTrainsetRequest extends FormRequest {
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
            'trainset_id' => 'required|integer,exists:trainsets,id',
            'carriage_id' => 'required|integer,exists:carriages,id',
            'qty' => 'required|integer',
        ];
    }
}
