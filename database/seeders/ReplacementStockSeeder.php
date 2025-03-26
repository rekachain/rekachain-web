<?php

namespace Database\Seeders;

use App\Models\ReplacementStock;
use Illuminate\Database\Seeder;

class ReplacementStockSeeder extends Seeder {
    /**
     * Run the database seeds.
     */
    public function run(): void {
        ReplacementStock::factory(20)->create();
    }
}
