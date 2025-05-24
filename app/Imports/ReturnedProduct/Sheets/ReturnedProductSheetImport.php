<?php

namespace App\Imports\ReturnedProduct\Sheets;

use App\Models\Component;
use App\Models\Panel;
use App\Models\ReturnedProduct;
use App\Models\User;
use App\Support\Enums\ReturnedProductStatusEnum;
use Illuminate\Support\Facades\Hash;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class ReturnedProductSheetImport implements ToModel, WithHeadingRow {
    public function __construct(protected string $userId) {}

    public function model(array $row) {
        $product = $row['product_type'] == 'Panel' ? Panel::firstOrCreate([
            'name' => $row['product_name'],
        ]) : Component::firstOrCreate([
            'name' => $row['product_name'],
        ]);

        $returnedProduct = ReturnedProduct::create([
            'product_returnable_id' => $product->id,
            'product_returnable_type' => $row['product_type'] == 'Panel' ? Panel::class : Component::class,
            'buyer_id' => User::firstOrCreate([
                'name' => $row['customer_optional'],
            ], ['password' => Hash::make('password')])->id,
            'serial_number' => $row['serial_number'],
        ]);

        $returnedProduct->returned_product_notes()->create([
            'user_id' => $this->userId,
            'status' => ReturnedProductStatusEnum::DRAFT->value,
            'note' => $row['note'],
        ]);

        return $returnedProduct;
    }
}
