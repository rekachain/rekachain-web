<?php

namespace App\Http\Requests\ReturnedProductNote;

use Illuminate\Foundation\Http\FormRequest;

class UpdateReturnedProductNoteRequest extends FormRequest {
    public function rules(): array {
        return [
            'returned_product_id' => ['nullable', 'exists:returned_products,id'],
            'note' => ['nullable', 'string'],
            'user_id' => ['nullable', 'exists:users,id'],
        ];
    }
}