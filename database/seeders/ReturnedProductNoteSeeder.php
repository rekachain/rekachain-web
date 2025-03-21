<?php

namespace Database\Seeders;

use App\Models\ReturnedProduct;
use App\Models\ReturnedProductNote;
use App\Support\Enums\ReturnedProductStatusEnum;
use Illuminate\Database\Seeder;

class ReturnedProductNoteSeeder extends Seeder {
    /**
     * Run the database seeds.
     */
    public function run(): void {
        foreach (ReturnedProduct::all() as $product) {
            ReturnedProductNote::factory($product->status == ReturnedProductStatusEnum::REQUESTED ? 1 : rand(1, 3))->create([
                'returned_product_id' => $product->id,
            ]);
        }
    }
}
