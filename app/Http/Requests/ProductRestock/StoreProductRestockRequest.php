<?php

namespace App\Http\Requests\ProductRestock;

use App\Models\Component;
use App\Models\Panel;
use App\Support\Enums\ProductRestockStatusEnum;
use Illuminate\Foundation\Http\FormRequest;

class StoreProductRestockRequest extends FormRequest {
    public function rules(): array {
        return [
            'returned_product_id' => 'required|exists:returned_products,id',
            'product_restockable_id' => 'required_with:product_restockable_type|integer|exists:' . (new $this->product_restockable_type)->getTable() . ',id',
            'product_restockable_type' => 'required_with:product_restockable_id|string|in:' . implode(',', [
                Component::class,
                Panel::class,
            ]),
            'project_id' => 'required|exists:projects,id',
            'status' => 'required|in:' . implode(',', ProductRestockStatusEnum::toArray()),
        ];
    }
}