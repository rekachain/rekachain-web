<?php

namespace App\Http\Requests\ProductRestock;

use App\Models\Component;
use App\Models\Panel;
use App\Support\Enums\IntentEnum;
use App\Support\Enums\ProductRestockStatusEnum;
use Illuminate\Foundation\Http\FormRequest;

class StoreProductRestockRequest extends FormRequest {
    public function rules(): array {
        $intent = $this->get('intent');
        switch ($intent) {
            case IntentEnum::WEB_PRODUCT_RESTOCK_INITIATE_PROJECT->value:
                return [
                    'project_name' => 'required|string|max:255',
                    'project_description' => 'required|string|max:255',
                    'project_initial_date' => 'required|date',
                    'product_restock_ids' => 'required|array|exists:product_restocks,id',
                ];
        }

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