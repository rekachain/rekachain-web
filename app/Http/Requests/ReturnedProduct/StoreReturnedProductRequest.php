<?php

namespace App\Http\Requests\ReturnedProduct;

use App\Models\Component;
use App\Models\Panel;
use App\Support\Enums\IntentEnum;
use App\Support\Enums\ReturnedProductStatusEnum;
use Illuminate\Foundation\Http\FormRequest;

class StoreReturnedProductRequest extends FormRequest {
    public function rules(): array {
        $intent = $this->get('intent');

        switch ($intent) {
            case IntentEnum::WEB_RETURNED_PRODUCT_IMPORT_RETURNED_PRODUCT_AND_PRODUCT_PROBLEM->value:
                return [
                    'import_file' => 'required|file|mimes:xlsx,xls|max:2048',
                ];
        }
        return [
            'product_returnable_type' => 'required_with:product_returnable_id|string|in:' . implode(',', [
                Panel::class,
                Component::class,
            ]),
            'product_returnable_id' => 'required_with:product_returnable_type|integer|exists:' . (new $this->product_returnable_type())->getTable() . ',id',
            'buyer_id' => 'nullable|integer|exists:users,id',
            'qty' => 'nullable|integer|min:1', // if serial panel then only one?
            'serial_panel_id' => 'nullable|integer|exists:serial_panels,id',
            'serial_number' => 'nullable|integer',
            'status' => 'nullable|in:' . implode(',', ReturnedProductStatusEnum::toArray()),
        ];
    }
}