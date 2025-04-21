<?php

namespace App\Http\Requests\ReturnedProduct;

use App\Models\Component;
use App\Models\Panel;
use App\Support\Enums\IntentEnum;
use App\Support\Enums\ProductProblemStatusEnum;
use App\Support\Enums\ReturnedProductStatusEnum;
use Illuminate\Foundation\Http\FormRequest;

class UpdateReturnedProductRequest extends FormRequest {
    public function rules(): array {
        $intent = $this->get('intent');
        switch ($intent) {
            case IntentEnum::WEB_RETURNED_PRODUCT_ADD_PRODUCT_PROBLEM->value:
                return [
                    'component_id' => 'nullable|integer|exists:components,id',
                    'new_component_name' => 'required_without:component_id|string',
                    'new_component_description' => 'required_without:component_id|string',
                    'status' => 'required|in:' . implode(',', ProductProblemStatusEnum::toArray()),
                    'image_path' => 'required_unless:status,' . ProductProblemStatusEnum::DRAFT->value . '|image|mimes:jpeg,png,jpg',
                    'note' => 'required_unless:status,' . ProductProblemStatusEnum::DRAFT->value . '|string',
                ];
            case IntentEnum::WEB_RETURNED_PRODUCT_IMPORT_PRODUCT_PROBLEM->value:
                return [
                    'import_file' => 'required|file|mimes:xlsx,xls|max:2048',
                ];
            case IntentEnum::WEB_RETURNED_PRODUCT_UPDATE_REPLACEMENT_STOCK->value:
                return [
                    'component_ids' => 'required|array|exists:replacement_stocks,component_id',
                ];
            case IntentEnum::WEB_RETURNED_PRODUCT_UPDATE_REPLACEMENT_STOCK_FOR_SCRAP->value:
                return [
                    'component_ids' => 'required|array|exists:replacement_stocks,component_id',
                    'req_production' => 'nullable|boolean',
                ];
        }

        return [
            'product_returnable_type' => 'nullable|string|in:' . implode(',', [
                Panel::class,
                Component::class,
            ]),
            'product_returnable_id' => [
                'required_with:product_returnable_type',
                'integer',
                $this->product_returnable_type ? 'exists:' . (new $this->product_returnable_type)->getTable() . ',id' : '',
            ],
            'buyer_id' => 'nullable|integer|exists:users,id',
            'qty' => 'nullable|integer|min:1',
            'serial_panel_id' => 'nullable|integer|exists:serial_panels,id',
            'serial_number' => 'nullable|integer',
            'status' => 'nullable|in:' . implode(',', ReturnedProductStatusEnum::toArray()),
            'image_path' => 'nullable|image|mimes:jpeg,png,jpg',
        ];
    }
}
