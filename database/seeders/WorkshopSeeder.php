<?php

namespace Database\Seeders;

use App\Models\Workshop;
use Illuminate\Database\Seeder;

class WorkshopSeeder extends Seeder {
    /**
     * Run the database seeds.
     */
    public function run(): void {

        $workshops = [
            [
                'name' => 'Candi Sewu',
                'address' => 'Jawa Tengah',
            ],
            [
                'name' => 'Sukosari',
                'address' => 'Jawa Tengah',
            ],
        ];

        foreach ($workshops as $workshop) {
            Workshop::create($workshop);
        }
    }
}
