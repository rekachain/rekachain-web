<?php

namespace Database\Seeders;

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
            'product_returnable_type' => 'App\Models\Panel'
        ]);
        ReturnedProduct::factory(5)->create([
            'product_returnable_type' => 'App\Models\Component'
        ]);
    }
}
