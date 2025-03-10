<?php

namespace App\Http\Requests\ProductProblem;

use App\Support\Enums\ProductProblemStatusEnum;
use Illuminate\Foundation\Http\FormRequest;

class StoreProductProblemRequest extends FormRequest {
    public function rules(): array {
        return [
            'returned_product_id' => 'required|exists:returned_products,id',
            'component_id' => 'required|exists:components,id',
            'status' => 'nullable|in:' . implode(',', ProductProblemStatusEnum::toArray()),
        ];
    }
}