<?php

namespace Database\Seeders;

use App\Models\HelpdeskContact;
use Illuminate\Database\Seeder;

class HelpdeskContactSeeder extends Seeder {
    /**
     * Run the database seeds.
     */
    public function run(): void {
        HelpdeskContact::factory()->create();
    }
}
