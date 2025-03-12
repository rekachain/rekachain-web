<?php

namespace App\Imports\ReturnedProduct\Sheets;

use App\Models\Component;
use App\Models\Panel;
use App\Models\ReturnedProduct;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class ReturnedProductSheetImport implements ToModel, WithHeadingRow {
    public function model(array $row) {
        $product = $row['product_type'] == 'Panel' ? Panel::firstOrCreate([
            'name' => $row['product_name'],
        ]) : Component::firstOrCreate([
            'name' => $row['product_name'],
        ]);

        return ReturnedProduct::firstOrCreate([
            'product_returnable_id' => $product->id,
            'product_returnable_type' => $row['product_type'] == 'Panel' ? Panel::class : Component::class,
            'qty' => $row['qty'],
            'buyer_id' => User::firstOrCreate([
                'name' => $row['customer_optional'],
            ], ['password' => Hash::make('password')])->id,
            'serial_number' => $row['serial_number'],
        ]);
    }
}
