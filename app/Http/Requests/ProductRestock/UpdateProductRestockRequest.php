<?php

namespace App\Http\Requests\ProductRestock;

use App\Models\Component;
use App\Models\Panel;
use App\Support\Enums\ProductRestockStatusEnum;
use Illuminate\Foundation\Http\FormRequest;

class UpdateProductRestockRequest extends FormRequest {
    public function rules(): array {
        return [
            'returned_product_id' => 'nullable|exists:returned_products,id',
            'product_restockable_id' => [
                'required_with:product_restockable_type',
                'integer',
                $this->product_restockable_type ? 'exists:' . (new $this->product_restockable_type)->getTable() . ',id' : '',
            ],
            'product_restockable_type' => 'nullable|string|in:' . implode(',', [
                Component::class,
                Panel::class,
            ]),
            'project_id' => 'nullable|exists:projects,id',
            'status' => 'nullable|in:' . implode(',', ProductRestockStatusEnum::toArray()),
        ];
    }
}
