<?php

namespace App\Http\Requests\ReturnedProductNote;

use Illuminate\Foundation\Http\FormRequest;

class StoreReturnedProductNoteRequest extends FormRequest {
    public function rules(): array {
        return [
            'returned_product_id' => ['required', 'exists:returned_products,id'],
            'note' => ['required', 'string'],
            'user_id' => ['nullable', 'exists:users,id'],
        ];
    }
}