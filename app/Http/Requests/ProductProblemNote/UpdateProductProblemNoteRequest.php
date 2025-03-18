<?php

namespace App\Http\Requests\ProductProblemNote;

use Illuminate\Foundation\Http\FormRequest;

class UpdateProductProblemNoteRequest extends FormRequest {
    public function rules(): array {
        return [
            'product_problem_id' => ['nullable', 'exists:product_problems,id'],
            'note' => ['nullable', 'string'],
            'user_id' => ['nullable', 'exists:users,id'],
        ];
    }
}