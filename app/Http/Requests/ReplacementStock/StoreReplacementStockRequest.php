<?php

namespace App\Http\Requests\ReplacementStock;

use Illuminate\Foundation\Http\FormRequest;

class StoreReplacementStockRequest extends FormRequest {
    public function rules(): array {
        return [
            'component_id' => 'required|exists:components,id',
            'threshold' => 'nullable|integer|min:0',
            'qty' => 'required|integer|min:1',
        ];
    }
}