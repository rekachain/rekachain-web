<?php

namespace Database\Seeders;

use App\Models\ProductRestock;
use Illuminate\Database\Seeder;

class ProductRestockSeeder extends Seeder {
    /**
     * Run the database seeds.
     */
    public function run(): void {
        ProductRestock::factory(10)->create();
    }
}
