<?php

namespace App\Http\Requests\ProductProblemNote;

use Illuminate\Foundation\Http\FormRequest;

class StoreProductProblemNoteRequest extends FormRequest {
    public function rules(): array {
        return [
            'product_problem_id' => ['required', 'exists:product_problems,id'],
            'note' => ['required', 'string'],
            'user_id' => ['required', 'exists:users,id'],
        ];
    }
}