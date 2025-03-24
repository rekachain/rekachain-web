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
        }
        return [
            'component_id' => 'required|exists:components,id',
            'threshold' => 'nullable|integer|min:0',
            'qty' => 'required|integer|min:1',
        ];
    }
}