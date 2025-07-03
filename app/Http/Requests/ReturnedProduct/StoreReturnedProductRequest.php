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
            case IntentEnum::WEB_RETURNED_PRODUCT_ADD_RETURNED_PRODUCT_REQUEST->value:
                return [
                    'product_returnable_type' => 'required_with:product_returnable_id|nullable|string|in:' . implode(',', [
                        Panel::class,
                        Component::class,
                    ]),
                    'product_returnable_id' => [
                        'required_with:product_returnable_type',
                        'nullable',
                        'integer',
                        $this->product_returnable_type ? 'exists:' . (new $this->product_returnable_type)->getTable() . ',id' : '',
                    ],
                    'qty' => 'nullable|integer|min:1',
                    'serial_number' => 'required_without:product_returnable_type|nullable|integer',
                ];
            case IntentEnum::WEB_RETURNED_PRODUCT_ADD_RETURNED_PRODUCT_WITH_NOTE->value:
                return [
                    'product_returnable_type' => 'required_with:product_returnable_id|string|in:' . implode(',', [
                        Panel::class,
                        Component::class,
                    ]),
                    'product_returnable_id' => [
                        'required_with:product_returnable_type',
                        'integer',
                        $this->product_returnable_type ? 'exists:' . (new $this->product_returnable_type)->getTable() . ',id' : '',
                    ],
                    'buyer_id' => 'nullable|integer|exists:users,id',
                    'qty' => 'nullable|integer|min:1', // if serial panel then only one?
                    'serial_panel_id' => 'nullable|integer|exists:serial_panels,id',
                    'serial_number' => 'required_without:product_returnable_type|integer',
                    'project_name' => 'nullable|string',
                    'trainset_name' => 'nullable|string',
                    'carriage_type' => 'nullable|string',
                    'status' => 'nullable|in:' . implode(',', ReturnedProductStatusEnum::toArray()),
                    'image_path' => 'required|image|mimes:jpeg,png,jpg',
                    'note' => 'required|string',
                ];
            case IntentEnum::API_RETURNED_PRODUCT_ADD_RETURNED_PRODUCT_WITH_NOTE->value:
                return [
                    'product_returnable_type' => 'required_with:product_returnable_id|string|in:' . implode(',', [
                        Panel::class,
                        Component::class,
                    ]),
                    'product_returnable_id' => [
                        'required_with:product_returnable_type',
                        'integer',
                        $this->product_returnable_type ? 'exists:' . (new $this->product_returnable_type)->getTable() . ',id' : '',
                    ],
                    'buyer_id' => 'nullable|integer|exists:users,id',
                    'qty' => 'nullable|integer|min:1', // if serial panel then only one?
                    'serial_panel_id' => 'nullable|integer|exists:serial_panels,id',
                    'serial_number' => 'required_without:product_returnable_type|integer',
                    'project_name' => 'nullable|string',
                    'trainset_name' => 'nullable|string',
                    'carriage_type' => 'nullable|string',
                    'status' => 'nullable|in:' . implode(',', ReturnedProductStatusEnum::toArray()),
                    'image_path' => 'required|image|mimes:jpeg,png,jpg',
                    'note' => 'required|string',
                ];
        }

        return [
            'product_returnable_type' => 'required_with:product_returnable_id|string|in:' . implode(',', [
                Panel::class,
                Component::class,
            ]),
            'product_returnable_id' => [
                'required_with:product_returnable_type',
                'integer',
                $this->product_returnable_type ? 'exists:' . (new $this->product_returnable_type)->getTable() . ',id' : '',
            ],
            'buyer_id' => 'nullable|integer|exists:users,id',
            'qty' => 'nullable|integer|min:1', // if serial panel then only one?
            'serial_panel_id' => 'nullable|integer|exists:serial_panels,id',
            'serial_number' => 'required_without:product_returnable_type|integer',
            'project_name' => 'nullable|string',
            'trainset_name' => 'nullable|string',
            'carriage_type' => 'nullable|string',
            'status' => 'nullable|in:' . implode(',', ReturnedProductStatusEnum::toArray()),
            'image_path' => 'required|image|mimes:jpeg,png,jpg',
        ];
    }
}
