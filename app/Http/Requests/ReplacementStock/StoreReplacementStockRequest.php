<?php

namespace App\Http\Requests\ReplacementStock;

use App\Support\Enums\IntentEnum;
use Illuminate\Foundation\Http\FormRequest;

class StoreReplacementStockRequest extends FormRequest {
    public function rules(): array {
        $intent = $this->get('intent');

        switch ($intent) {
            case IntentEnum::WEB_REPLACEMENT_STOCK_IMPORT_REPLACEMENT_STOCK->value:
                return [
                    'import_file' => 'required|file|mimes:xlsx,xls|max:2048',
                ];
            case IntentEnum::WEB_REPLACEMENT_STOCK_UPDATE_REPLACEMENT_STOCK_FOR_RETURNED_PRODUCT->value:
                return [
                    'component_ids' => 'required|array|exists:replacement_stocks,component_id',
                ];
            case IntentEnum::WEB_REPLACEMENT_STOCK_UPDATE_REPLACEMENT_STOCK_FROM_RETURNED_PRODUCT->value:
                return [
                    'component_ids' => 'required|array|exists:replacement_stocks,component_id',
                ];
        }

        return [
            'component_id' => 'required|exists:components,id|unique:replacement_stocks',
            'threshold' => 'nullable|integer|min:0',
            'qty' => 'required|integer|min:1',
        ];
    }
}
