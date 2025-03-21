<?php

namespace App\Http\Requests\ReplacementStock;

use Illuminate\Foundation\Http\FormRequest;

class UpdateReplacementStockRequest extends FormRequest {
    public function rules(): array {
        return [
            'component_id' => 'nullable|exists:components,id',
            'threshold' => 'nullable|integer|min:0',
            'qty' => 'nullable|integer|min:1',
        ];
    }
}