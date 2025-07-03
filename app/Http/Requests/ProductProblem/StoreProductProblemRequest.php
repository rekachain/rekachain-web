<?php

namespace App\Http\Requests\ProductProblem;

use App\Support\Enums\IntentEnum;
use App\Support\Enums\ProductProblemCauseEnum;
use App\Support\Enums\ProductProblemStatusEnum;
use Illuminate\Foundation\Http\FormRequest;

class StoreProductProblemRequest extends FormRequest {
    public function rules(): array {
        $intent = $this->get('intent');

        switch ($intent) {
            case IntentEnum::WEB_PRODUCT_PROBLEM_ADD_PRODUCT_PROBLEM_WITH_NOTE->value:
                return [
                    'returned_product_id' => 'required|exists:returned_products,id',
                    'component_id' => 'required|exists:components,id',
                    'cause' => 'nullable|in:' . implode(',', ProductProblemCauseEnum::toArray()),
                    'status' => 'nullable|in:' . implode(',', ProductProblemStatusEnum::toArray()),
                    'image_path' => 'nullable|image|mimes:jpeg,png,jpg',
                    'note' => 'required|string',
                ];
        }

        return [
            'returned_product_id' => 'required|exists:returned_products,id',
            'component_id' => 'required|exists:components,id',
            'cause' => 'nullable|in:' . implode(',', ProductProblemCauseEnum::toArray()),
            'status' => 'nullable|in:' . implode(',', ProductProblemStatusEnum::toArray()),
            'image_path' => 'nullable|image|mimes:jpeg,png,jpg',
        ];
    }
}
