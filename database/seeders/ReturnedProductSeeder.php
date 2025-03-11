<?php

namespace Database\Seeders;

use App\Models\Component;
use App\Models\Panel;
use App\Models\ReturnedProduct;
use App\Support\Enums\ReturnedProductStatusEnum;
use Illuminate\Database\Seeder;

class ReturnedProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        ReturnedProduct::factory(3)->create([
            'product_returnable_type' => Panel::class,
            'qty' => 1,
        ]);
        ReturnedProduct::factory(5)->create([
            'product_returnable_type' => Component::class,
            'serial_panel_id' => null,
        ]);
        // seed buyer request
        ReturnedProduct::factory(3)->create([
            'status' => ReturnedProductStatusEnum::REQUESTED->value,
            'serial_panel_id' => null
        ]);
    }
}
