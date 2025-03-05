<?php

namespace Database\Seeders;

use App\Models\Component;
use App\Models\Panel;
use App\Models\ReturnedProduct;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ReturnedProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        ReturnedProduct::factory(3)->create([
            'product_returnable_type' => Panel::class
        ]);
        ReturnedProduct::factory(5)->create([
            'product_returnable_type' => Component::class
        ]);
    }
}
