<?php

namespace App\Http\Requests\ProductProblem;

use App\Support\Enums\IntentEnum;
use App\Support\Enums\ProductProblemStatusEnum;
use Illuminate\Foundation\Http\FormRequest;

class UpdateProductProblemRequest extends FormRequest {
    public function rules(): array {
        $intent = $this->get('intent');

        switch ($intent) {
            case IntentEnum::WEB_PRODUCT_PROBLEM_UPDATE_PRODUCT_PROBLEM_WITH_NOTE->value:
                return [
                    'returned_product_id' => 'nullable|exists:returned_products,id',
                    'component_id' => 'nullable|exists:components,id',
                    'status' => 'nullable|in:' . implode(',', ProductProblemStatusEnum::toArray()),
                    'image_path' => 'nullable|image|mimes:jpeg,png,jpg',
                    'note' => 'nullable|string',
                ];
        }
        return [
            'returned_product_id' => 'nullable|exists:returned_products,id',
            'component_id' => 'nullable|exists:components,id',
            'status' => 'nullable|in:' . implode(',', ProductProblemStatusEnum::toArray()),
            'image_path' => 'nullable|image|mimes:jpeg,png,jpg',
        ];
    }
}
