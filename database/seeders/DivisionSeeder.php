<?php

namespace Database\Seeders;

use App\Models\Division;
use Illuminate\Database\Seeder;

class DivisionSeeder extends Seeder {
    /**
     * Run the database seeds.
     */
    public function run(): void {
        $divisions = [
            'Mekanik',
            'Elektrik',
            'Assembly',
            'Aftersales',
        ];

        foreach ($divisions as $division) {
            Division::firstOrCreate(['name' => $division]);
        }
    }
}
