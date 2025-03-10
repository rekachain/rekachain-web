<?php

namespace App\Http\Requests\ProductProblem;

use App\Support\Enums\ProductProblemStatusEnum;
use Illuminate\Foundation\Http\FormRequest;

class UpdateProductProblemRequest extends FormRequest {
    public function rules(): array {
        return [
            'returned_product_id' => 'nullable|exists:returned_products,id',
            'component_id' => 'nullable|exists:components,id',
            'status' => 'nullable|in:' . implode(',', ProductProblemStatusEnum::toArray()),
        ];
    }
}