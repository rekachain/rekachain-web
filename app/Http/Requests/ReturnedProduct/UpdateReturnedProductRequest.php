<?php

namespace App\Http\Requests\ReturnedProduct;

use App\Models\Component;
use App\Models\Panel;
use App\Support\Enums\ReturnedProductStatusEnum;
use Illuminate\Foundation\Http\FormRequest;

class UpdateReturnedProductRequest extends FormRequest {
    public function rules(): array {
        return [
            'product_returnable_type' => 'nullable|string|in:' . implode(',', [
                Panel::class,
                Component::class,
            ]),
            'product_returnable_id' => [
                'required_with:product_returnable_type',
                'integer',
                $this->product_returnable_type ? 'exists:' . (new $this->product_returnable_type())->getTable() . ',id' : '',
            ],
            'buyer_id' => 'nullable|integer|exists:users,id',
            'qty' => 'nullable|integer|min:1',
            'serial_panel_id' => 'nullable|integer|exists:serial_panels,id',
            'serial_number' => 'nullable|integer',
            'status' => 'nullable|in:' . implode(',', ReturnedProductStatusEnum::toArray()),
        ];
    }
}