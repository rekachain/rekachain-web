<?php

namespace App\Http\Requests\ReturnedProduct;

use App\Models\Component;
use App\Models\Panel;
use Illuminate\Foundation\Http\FormRequest;

class UpdateReturnedProductRequest extends FormRequest {
    public function rules(): array {
        return [
            'product_returnable_type' => 'required_with:product_returnable_id|string|in:' . implode(',', [
                Panel::class,
                Component::class,
            ]),
            'product_returnable_id' => 'required_with:product_returnable_type|integer|exists:' . (new $this->product_returnable_type())->getTable() . ',id',
            'qty' => 'required|integer|min:1',
            'serial_number' => 'nullable|integer',
        ];
    }
}